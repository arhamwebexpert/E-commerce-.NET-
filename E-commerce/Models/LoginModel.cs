using System.ComponentModel.DataAnnotations;

namespace E_commerce.Models
{
    public class LoginModel

    {
        public LoginModel() { }  // Parameterless constructor is required for deserialization

        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        public bool RememberMe { get; set; }

        
    }
}
