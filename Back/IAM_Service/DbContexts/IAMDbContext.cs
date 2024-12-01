using Microsoft.EntityFrameworkCore;
using IrisAPI.Models;

namespace IrisAPI.DbContexts
{
    public class IAMDbContext(DbContextOptions<IAMDbContext> options) : DbContext(options)
    {
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Admin> Admins { get; set; } = null!;
    }
}