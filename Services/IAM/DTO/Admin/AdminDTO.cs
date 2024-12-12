using System.ComponentModel.DataAnnotations;

namespace IrisAPI.DTO.Admin
{
    public class AdminDTO
    {
        [MaxLength(50)]
        public string? Username { set; get; }
        [EmailAddress]
        public required string Email { set; get; }
        public required bool IsOnline { set; get; }
        public bool IsBanned { set; get; }
        public bool IsDeleted { set; get; }
        public required DateTime LastSeen { set; get; }
        [MaxLength(100)]
        public required string FirstName { set; get; }
        [MaxLength(100)]
        public string? LastName { set; get; }
        [MaxLength(500)]
        public string? Bio { set; get; }
    }
}
