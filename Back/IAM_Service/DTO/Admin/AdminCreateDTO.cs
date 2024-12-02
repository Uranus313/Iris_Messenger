using System.ComponentModel.DataAnnotations;

namespace IrisAPI.DTO.Admin
{

    public class AdminCreateDTO
    {

        [MaxLength(50)]
        public string? Username { set; get; }
        [MaxLength(50)]
        public required string Password { set; get; }
        [EmailAddress]
        public required string Email { set; get; }
        [MaxLength(100)]
        public required string FirstName { set; get; }
        [MaxLength(100)]
        public string? LastName { set; get; }
        [MaxLength(500)]
        public string? Bio { set; get; }
    }
}
