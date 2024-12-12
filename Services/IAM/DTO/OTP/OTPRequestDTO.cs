using System.ComponentModel.DataAnnotations;

namespace IrisAPI.DTO.OTP
{
    public class OTPRequestDTO
    {
        [EmailAddress]
        public required string Email { set; get; }
    }
}
