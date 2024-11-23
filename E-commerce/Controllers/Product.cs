using E_commerce.Data;
using E_commerce.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace E_commerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProductController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST: api/product
        [HttpPost]
        public async Task<IActionResult> CreateProduct([FromForm] Product product, [FromForm] IFormFile image)
        {
            // Step 1: Manually check if the image file is provided
            if (image == null)
            {
                return BadRequest(new { Errors = new[] { "Image file is required." } });
            }

            // Define the path to save images
            var uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images");

            // Create the directory if it doesn't exist
            if (!Directory.Exists(uploadPath))
            {
                Directory.CreateDirectory(uploadPath);
            }

            // Generate a unique file name to avoid overwriting files with the same name
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(image.FileName);

            // Step 2: Save the image file to the server
            var filePath = Path.Combine(uploadPath, fileName);
            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await image.CopyToAsync(fileStream);
            }

            // Step 3: Set ImageUrl with the relative path to the image
            product.ImageUrl = "/images/" + fileName;

            // Step 4: Add product to the database and save
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return Ok(product);
        }
        // GET: api/product
        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            var products = await _context.Products.ToListAsync();  // Fetch from database
            return Ok(products);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return Ok(product);


        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Product updateProduct)
        {
            if (id != updateProduct.Id)
            {
                return BadRequest(new { message = "Product mismatch" });
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound(new { message = "Product not found" });
            }

            // Update properties including the new ImageUrl field
            product.Name = updateProduct.Name;
            product.Price = updateProduct.Price;
            product.Description = updateProduct.Description;
            product.Category = updateProduct.Category;
            product.Quantity = updateProduct.Quantity;
            product.InStock = updateProduct.InStock;
            product.ImageUrl = updateProduct.ImageUrl;

            await _context.SaveChangesAsync();

            return NoContent();  // Status code 204 with no response body
        }


    }
}
