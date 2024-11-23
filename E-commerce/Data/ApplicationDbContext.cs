using Microsoft.EntityFrameworkCore;  // Ensure this is correctly imported
using E_commerce.Models;  // Import your models
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
namespace E_commerce.Data
{
    public class ApplicationDbContext : DbContext  // Ensure correct inheritance from DbContext
    {
        // Constructor with DbContextOptions to configure EF Core
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Cart> Carts { get; set; }

        // Add DbSet for CartItem if needed

        // Define the Products table
        public DbSet<Product> Products { get; set; }

        public DbSet<User> Users { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);  // Call the base method to retain the default behavior

            // Map the Cart entity to the "Cart" table
            modelBuilder.Entity<Cart>().ToTable("Cart");
        }
    }
}
