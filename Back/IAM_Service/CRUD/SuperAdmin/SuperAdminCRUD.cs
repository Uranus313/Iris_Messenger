using IrisAPI.DbContexts;
using IrisAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace IrisAPI.CRUD.SuperAdminCRUD
{
    public class SuperAdminCRUD(IAMDbContext context) : ISuperAdminCRUD
    {
        private readonly IAMDbContext _context = context ?? throw new ArgumentNullException(nameof(context));
        public async Task<SuperAdmin?> ValidateSuperAdmin(string email, string password)
        {
            return await _context.SuperAdmins.Where(superAdmin => superAdmin.Email == email && superAdmin.Password == password).FirstOrDefaultAsync();
        }
    }
}
