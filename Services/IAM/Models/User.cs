using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace IrisAPI.Models
{
    [Index(nameof(Email), IsUnique = true)]
    [Index(nameof(Username), IsUnique = true)]
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { set; get; }

        [MaxLength(50)]
        public string? Username { set; get; }

        [EmailAddress]
        public required string Email { set; get; }

        [MaxLength(50)]
        public string? TwoStepPassword { set; get; }

        public bool IsOnline { set; get; } = true;

        public bool IsBanned { set; get; } = false;

        public bool IsDeleted { set; get; } = false;

        public DateTime LastSeen { set; get; } = DateTime.UtcNow;

        [MaxLength(100)]
        public required string FirstName { set; get; }

        [MaxLength(100)]
        public string? LastName { set; get; }

        [MaxLength(500)]
        public string? Bio { set; get; }

        public DateTime CreationTime { get; } = DateTime.UtcNow;
    }
}
