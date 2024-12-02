using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace IrisAPI.Models
{
    [Index(nameof(Email), IsUnique = true)]
    public class Admin
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { set; get; }

        [EmailAddress]
        public required string Email { set; get; }

        [MaxLength(50)]
        public required string Password { set; get; }

        public bool IsOnline { set; get; } = true;

        public bool IsBanned { set; get; } = false;

        public bool IsDeleted { set; get; } = false;

        public DateTime LastSeen { set; get; } = DateTime.UtcNow;

        [MaxLength(100)]
        public required string FirstName { set; get; }

        [MaxLength(100)]
        public string? LastName { set; get; }

        public DateTime CreationTime { get; } = DateTime.UtcNow;
    }
}
