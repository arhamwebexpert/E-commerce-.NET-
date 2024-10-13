using System.ComponentModel.DataAnnotations;

namespace E_commerce.Models
{
    public class Product
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Product Name is Required")]
        [StringLength(100,ErrorMessage = "Product length should be 100")]
        public string Name { get; set; }

        [Required]
        public decimal Price { get; set; }

        [Required]
        public string Description { get; set; }

        public string category { get; set; }

        public int quantity { get; set; } 

        public bool inStock { get; set; }

     public Product() { }
    }
}
