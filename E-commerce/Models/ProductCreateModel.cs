    using System.ComponentModel.DataAnnotations.Schema;

    namespace E_commerce.Models
    {
        public class ProductCreateModel
        {
            public string Name { get; set; }
            public decimal Price { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public int Quantity { get; set; }
            public bool InStock { get; set; }

            // This property is used for file uploads only and is not mapped to the database
            [NotMapped]
            public IFormFile Image { get; set; }
        }
    }
