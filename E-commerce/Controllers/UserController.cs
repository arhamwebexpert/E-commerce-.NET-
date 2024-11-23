using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using E_commerce.Data;
using E_commerce.Models;
using System.Threading.Tasks;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Identity;


namespace E_commerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] User user)
        {
            if (ModelState.IsValid)
            {
                var existingUser = await _context.Users.AnyAsync(u => u.Email == user.Email);
                if (existingUser)
                {
                    return Conflict(new { message = "A user with this email already exists." });
                }

                // Consider hashing the password here before saving
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
                return Ok(user);
            }
            return BadRequest(ModelState);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);

        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            return Ok(users);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsers(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return Ok(user);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] User updatedUser)
        {
            if (id != updatedUser.Id)
            {
                return BadRequest(new { message = "User ID mismatch" });
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound(new { message = "User not found" });
            }

            user.Name = updatedUser.Name;
            user.Email = updatedUser.Email;
            user.Password = updatedUser.Password;  // Consider password hashing
            user.Access = updatedUser.Access;

            await _context.SaveChangesAsync();

            return NoContent();  // Status code 204 with no response body
        }
        [HttpPost("login")]
        public async Task<IActionResult> Authenticate([FromBody] LoginModel loginRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Find the user by email
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == loginRequest.Email);

            // Verify user and password (this should be securely hashed in a real application)
            if (user == null || user.Password != loginRequest.Password)
            {
                return Unauthorized(new { message = "Invalid email or password" });
            }

            // Return a response that includes the Access role
            return Ok(new
            {
                message = "Login successful",
                userId = user.Id,
                name = user.Name,
                email = user.Email,
                access = user.Access // Include the access role in the response
            });
        }

    }



}
