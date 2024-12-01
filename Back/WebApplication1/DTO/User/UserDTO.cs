using System.ComponentModel.DataAnnotations;

namespace IrisAPI.DTO.User
{

    public class UserDTO
    {

        [MaxLength(50)]
        public string? Username { set; get; }
        [EmailAddress]
        public required string Email { set; get; }
        [MaxLength(100)]
        public required bool IsOnline { set; get; }
        public required DateTime LastSeen { set; get; }
        public required string FirstName { set; get; }
        [MaxLength(100)]
        public string? LastName { set; get; }
        [MaxLength(500)]
        public string? Bio { set; get; }
    }
}