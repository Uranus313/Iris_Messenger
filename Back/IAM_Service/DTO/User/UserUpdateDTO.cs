using System.ComponentModel.DataAnnotations;

namespace IrisAPI.DTO.User
{

    public class UserUpdateDTO
    {
        [MaxLength(50)]
        public string? Username { set; get; }
        [EmailAddress]
        public string? Email { set; get; }
        [MaxLength(50)]
        public DateTime? LastSeen { set; get; }
        [MaxLength(100)]
        public string? FirstName { set; get; }
        [MaxLength(100)]
        public string? LastName { set; get; }
        [MaxLength(500)]
        public string? Bio { set; get; }
    }
}
