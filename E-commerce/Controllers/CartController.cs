using Microsoft.AspNetCore.Mvc;
using E_commerce.Data;
using E_commerce.Models;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace E_commerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CartController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> SubmitCart([FromBody] Cart cart)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                _context.Carts.Add(cart);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Cart submitted successfully", cartId = cart.Id });
            }
            catch (Exception ex)
            {
                // Log the exception (consider using a logging library)
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpGet("user-purchases/{userId}")]
        public async Task<IActionResult> GetUserPurchases(int userId)
        {
            var purchases = await _context.Carts
                                          .Include(c => c.Items) // Ensure related items are included
                                          .Where(c => c.UserId == userId)
                                          .ToListAsync();

            if (purchases == null || !purchases.Any())
            {
                return NotFound(new { message = "No purchases found for this user." });
            }

            return Ok(purchases);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCart(int id)
        {
            var cart = await _context.Carts
                .Include(c => c.Items)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (cart == null)
            {
                return NotFound(new { message = "Purchase not found" });
            }

            _context.Carts.Remove(cart);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Purchase deleted successfully" });
        }


    }
}
