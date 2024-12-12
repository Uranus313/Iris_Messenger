using IrisAPI.Models;

namespace IrisAPI.CRUD.SuperAdminCRUD
{
    public interface ISuperAdminCRUD
    {
        Task<SuperAdmin?> ValidateSuperAdmin(string email, string password);
        Task<SuperAdmin?> GetSuperAdmin(int id);
    }
}
