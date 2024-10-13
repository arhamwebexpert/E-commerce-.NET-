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
        public async Task<IActionResult> CreateProduct([FromBody] Product product)
        {
            if (ModelState.IsValid)
            {
                _context.Products.Add(product);
                await _context.SaveChangesAsync();  // Save changes to the database
                return Ok(product);
            }

            return BadRequest(ModelState);  // Return validation errors if any
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
        public async Task<IActionResult> UpdateUser(int id, [FromBody] Product updateProduct)
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

            if (product==null)
            {
                return NotFound(new { message = " not found" });
            }

           
            product.Id = updateProduct.Id;
            product.quantity = updateProduct.quantity;
            product.inStock= updateProduct.inStock;
            product.category = updateProduct.category;
            product.Name = updateProduct.Name;
            product.Price = updateProduct.Price;
            product.Description = updateProduct.Description;


            await _context.SaveChangesAsync();

            return NoContent();  // Status code 204 with no response body
        }

    }
}
