using System.ComponentModel.DataAnnotations;

namespace IrisAPI.DTO.User
{
    public class UserRequestDTO
    {
        [MaxLength(6)]
        public required string VerificationCode { set; get; }
        [EmailAddress]
        public required string Email { set; get; }
    }
}
