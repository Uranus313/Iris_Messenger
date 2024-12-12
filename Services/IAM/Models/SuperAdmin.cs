using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace IrisAPI.Models
{
    [Index(nameof(Email), IsUnique = true)]
    public class SuperAdmin
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { set; get; }

        [EmailAddress]
        public required string Email { set; get; }

        [MaxLength(50)]
        public required string Password { set; get; }

        public DateTime CreationTime { get; } = DateTime.UtcNow;
    }
}
