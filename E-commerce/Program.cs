using E_commerce.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();

// Add CORS policy to allow the React app
// Add DbContext for Entity Framework Core
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        builder => builder
            .WithOrigins("http://localhost:3001")  // Allow the React app's origin
            .AllowAnyMethod()
            .AllowAnyHeader()
    );
});

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
// Enable CORS for the React app
app.UseCors("AllowReactApp");

app.UseAuthorization();

// Map controller routes
app.MapControllers();

app.Run();
