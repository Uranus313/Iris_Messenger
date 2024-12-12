using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace IrisAPI.Models
{
    [Index(nameof(Email), IsUnique = true)]
    public class OTP
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { set; get; }

        [EmailAddress]
        public required string Email { set; get; }

        [MaxLength(100)]
        public required string Password { set; get; }

        public required DateTime ExpirationTime { set; get; }
    }
}
