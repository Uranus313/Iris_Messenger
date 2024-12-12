using System.ComponentModel.DataAnnotations;

namespace IrisAPI.DTO.SuperAdmin
{
    public class SuperAdminRequestDTO
    {
        [MaxLength(50)]
        public required string Password { set; get; }
        [EmailAddress]
        public required string Email { set; get; }
    }
}
