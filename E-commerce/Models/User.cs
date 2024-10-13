using System.ComponentModel.DataAnnotations;

namespace E_commerce.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        public char Access { get; set; } = 'U';  // Default to 'U' if not set

        public User() { }

    }
}
