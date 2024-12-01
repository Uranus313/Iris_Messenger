using AutoMapper;
using Microsoft.EntityFrameworkCore;
using IrisAPI.DbContexts;
using IrisAPI.DTO.Admin;
using IrisAPI.Models;

namespace IrisAPI.CRUD.AdminCRUD
{
    public class AdminCRUD(IAMDbContext context, IMapper mapper) : IAdminCRUD
    {
        private readonly IAMDbContext _context = context ?? throw new ArgumentNullException(nameof(context));
        private readonly IMapper _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));

        public async Task<IEnumerable<Admin>> GetAdmins()
        {
            return await _context.Admins.ToListAsync();
        }
        public async Task<Admin?> GetAdmin(int adminId)
        {
            return await _context.Admins.Where(admin => admin.Id == adminId).FirstOrDefaultAsync();
        }
        public async Task<bool> AdminExists(int adminId)
        {
            return await _context.Admins.AnyAsync(admin => admin.Id == adminId);
        }
        public async Task<Admin> CreateAdmin(Admin admin)
        {
            _context.Admins.Add(admin);
            await _context.SaveChangesAsync();
            return admin;
        }
        public async Task<Admin?> UpdateAdmin(int adminId, AdminUpdateDTO adminUpdateDTO)
        {
            var admin = await GetAdmin(adminId);
            if (admin != null)
            {
                _mapper.Map(adminUpdateDTO, admin);
                await _context.SaveChangesAsync();
            }
            return admin;
        }
        public async Task<Admin?> DeleteAdmin(int adminId)
        {
            var admin = await GetAdmin(adminId);
            if (admin != null)
            {
                _context.Admins.Remove(admin);
                await _context.SaveChangesAsync();
            }
            return admin;
        }
        public async Task<Admin?> ValidateAdmin(string email)
        {
            return await _context.Admins.Where(admin => admin.Email == email).FirstOrDefaultAsync();
        }
    }

}