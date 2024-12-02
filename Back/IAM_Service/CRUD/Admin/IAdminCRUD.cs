using IrisAPI.DTO.Admin;
using IrisAPI.Models;

namespace IrisAPI.CRUD.AdminCRUD
{
    public interface IAdminCRUD
    {
        Task<IEnumerable<Admin>> GetAdmins();
        Task<Admin?> GetAdmin(int adminId);
        Task<bool> AdminExists(int adminId);
        Task<Admin> CreateAdmin(Admin admin);
        Task<Admin?> UpdateAdmin(int adminId, AdminUpdateDTO adminUpdateDTO);
        Task<Admin?> DeleteAdmin(int adminId);
        Task<Admin?> ValidateAdmin(string email, string password);
    }
}