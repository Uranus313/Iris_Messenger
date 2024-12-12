using System.ComponentModel.DataAnnotations;

namespace IrisAPI.DTO.Admin
{
    public class AdminRequestDTO
    {
        [MaxLength(50)]
        public required string Password { set; get; }
        [EmailAddress]
        public required string Email { set; get; }
    }
}
