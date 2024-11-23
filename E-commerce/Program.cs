using E_commerce.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Prometheus;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();

var key = Encoding.ASCII.GetBytes("YourSuperSecretKey"); // Store this key securely (e.g., environment variables)

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

// Configure Entity Framework and DbContext
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenLocalhost(5091); // Bind explicitly to localhost
});

builder.Services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true)
    .AddEntityFrameworkStores<ApplicationDbContext>();
builder.WebHost.UseUrls("http://0.0.0.0:5091");

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policyBuilder =>
    {
        policyBuilder.WithOrigins("http://localhost:3001", "http://192.168.100.67:3001")  // Use the correct React port
                     .AllowAnyMethod()
                     .AllowAnyHeader()
                     .AllowCredentials(); // If you're using cookies or credentials
    });

});

var app = builder.Build();


app.UseRouting();  // Routing middleware should be before authorization
app.UseHttpMetrics(); // Tracks HTTP request metrics.

app.UseEndpoints(endpoints =>
{
    // Map controllers
    endpoints.MapControllers();

    // Map metrics endpoint for Prometheus scraping
    endpoints.MapMetrics("/metrics");
});

// Developer exception page for development environment
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseAuthentication();
app.UseAuthorization();

// Enable CORS for the React app
app.UseDeveloperExceptionPage();

app.UseCors("AllowReactApp");
app.UseStaticFiles(); // This should be included in your pipeline configuration



app.UseAuthorization(); // Keep this only if you are using authorization in your app
app.UseStaticFiles();

// Map controller routes
app.MapControllers();

app.Run();
