using Microsoft.EntityFrameworkCore;  // Ensure this is correctly imported
using E_commerce.Models;  // Import your models

namespace E_commerce.Data
{
    public class ApplicationDbContext : DbContext  // Ensure correct inheritance from DbContext
    {
        // Constructor with DbContextOptions to configure EF Core
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // Define the Products table
        public DbSet<Product> Products { get; set; }

        public DbSet<User> Users { get; set; }

    }
}
