using System.ComponentModel.DataAnnotations;

namespace IrisAPI.DTO.SuperAdmin
{
    public class SuperAdminDTO
    {
        [EmailAddress]
        public required string Email { set; get; }
    }
}
