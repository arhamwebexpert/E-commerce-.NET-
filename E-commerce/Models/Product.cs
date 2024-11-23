using System.ComponentModel.DataAnnotations;

namespace E_commerce.Models
{
    public class Product
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Product Name is Required")]
        [StringLength(100, ErrorMessage = "Product length should be 100")]
        public string Name { get; set; }

        [Required]
        public decimal Price { get; set; }

        [Required]
        public string Description { get; set; }

        public string Category { get; set; }

        public int Quantity { get; set; }

        public bool InStock { get; set; }

        public string? ImageUrl { get; set; }

        // Owner ID (who created the product)
        public string UserId { get; set; }

        // New Property: Buyer ID
        // Default to "0" (indicating not purchased yet)
        public string BuyerId { get; set; } = "0";
    }
}
