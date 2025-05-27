using E_commerce.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using App.Metrics;
using App.Metrics.Formatters.Prometheus;
using Prometheus;
using E_commerce.Controllers;
using Microsoft.Identity.Client;
using Serilog;
using Serilog.Sinks.Grafana.Loki;
using Microsoft.Extensions.Logging;

var builder = WebApplication.CreateBuilder(args);


Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .WriteTo.File("logs/log.txt")
    .CreateLogger();

builder.Host.UseSerilog();
builder.Services.AddControllers();


// Add JWT Authentication
var key = Encoding.ASCII.GetBytes("YourSuperSecretKey"); // Replace with a secure key stored in environment variables
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});

// Configure Entity Framework and ApplicationDbContext
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add Identity
builder.Services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true)
    .AddEntityFrameworkStores<ApplicationDbContext>();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policyBuilder =>
    {
        policyBuilder.WithOrigins("http://localhost:3001")
                     .AllowAnyMethod()
                     .AllowAnyHeader()
                     .AllowCredentials();
    });
});

// Configure App Metrics
var metrics = AppMetrics.CreateDefaultBuilder()
    .OutputMetrics.AsPrometheusPlainText()
    .Build();

builder.Services.AddMetrics(metrics);
builder.Services.AddMetricsReportingHostedService();
builder.Services.AddMetricsTrackingMiddleware();

builder.Services.AddMetricsEndpoints(options =>
{
    options.MetricsEndpointOutputFormatter = new MetricsPrometheusTextOutputFormatter(); // Set Prometheus formatter
});
builder.Services.AddMetricsTrackingMiddleware(); // Enables request metrics tracking

// Configure Kestrel to listen on specific ports
builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(5091); // Allow connections from any IP on port 5091
});

// Set explicit URLs for the web host
builder.WebHost.UseUrls("http://localhost:5091", "http://arham:5091");

// Build the application
var app = builder.Build();

// Configure middleware pipeline

// Developer exception page for development
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

// Enable HTTPS redirection (if applicable)
app.UseHttpsRedirection();

app.Use(async (context, next) =>
{
    // Resolve IMetrics from the DI container
    var metrics = context.RequestServices.GetService<App.Metrics.IMetrics>();

    if (metrics != null)
    {
        using (metrics.Measure.Timer.Time(CustomMetrics.RequestTimer))
        {
            await next.Invoke();
        }

        var responseSize = context.Response.ContentLength ?? 0;
        metrics.Measure.Histogram.Update(CustomMetrics.ResponseSizeHistogram, responseSize);
    }
    else
    {
        await next.Invoke();
    }
});


// Enable CORS
app.UseCors("AllowReactApp");

// Add App Metrics middleware for tracking and exposing metrics
app.UseMetricsAllMiddleware(); // Middleware to collect metrics
app.UseMetricsEndpoint(); // Expose the /metrics endpoint

// Add Prometheus HTTP metrics
app.UseHttpMetrics(); // Adds HTTP request metrics

// Enable routing
app.UseRouting();

// Enable authentication and authorization
app.UseAuthentication();
app.UseAuthorization();
// app.UseStaticFiles();
// Map Prometheus metrics and controllers
app.MapMetrics(); // Maps the Prometheus /metrics endpoint
app.MapControllers(); // Maps API controllers

// Run the application
app.Run();
