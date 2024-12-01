using IrisAPI.DTO.User;
using IrisAPI.Models;

namespace IrisAPI.CRUD.UserCRUD
{
    public interface IUserCRUD
    {
        Task<IEnumerable<User>> GetUsers();
        Task<User?> GetUser(int userd);
        Task<bool> UserExists(int userId);
        Task<User> CreateUser(User user);
        Task<User?> UpdateUser(int userId, UserUpdateDTO userUpdateDTO);
        Task<User?> DeleteUser(int userId);
        Task<User?> ValidateUser(string email);
    }
}