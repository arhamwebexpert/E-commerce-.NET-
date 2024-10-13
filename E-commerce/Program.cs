using E_commerce.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();

// Configure Entity Framework and DbContext
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add CORS policy to allow the React app (adjust the port to your React app's actual port)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policyBuilder =>
    {
        policyBuilder.WithOrigins("http://localhost:3001")  // Use the correct React port
                     .AllowAnyMethod()
                     .AllowAnyHeader()
                     .AllowCredentials(); // If you're using cookies or credentials
    });
});

var app = builder.Build();

// Developer exception page for development environment
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

// Enable CORS for the React app
app.UseCors("AllowReactApp");

app.UseRouting();  // Routing middleware should be before authorization

app.UseAuthorization(); // Keep this only if you are using authorization in your app

// Map controller routes
app.MapControllers();

app.Run();
