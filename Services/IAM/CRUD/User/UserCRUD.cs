using AutoMapper;
using Microsoft.EntityFrameworkCore;
using IrisAPI.DbContexts;
using IrisAPI.DTO.User;
using IrisAPI.Models;

namespace IrisAPI.CRUD.UserCRUD
{
    public class UserCRUD(IAMDbContext context, IMapper mapper) : IUserCRUD
    {
        private readonly IAMDbContext _context = context ?? throw new ArgumentNullException(nameof(context));
        private readonly IMapper _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));

        public async Task<IEnumerable<User>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }
        public async Task<User?> GetUser(int userId)
        {
            return await _context.Users.Where(user => user.Id == userId).FirstOrDefaultAsync();
        }
        public async Task<bool> UserExists(int userId)
        {
            return await _context.Users.AnyAsync(user => user.Id == userId);
        }
        public async Task<User> CreateUser(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }
        public async Task<User?> UpdateUser(int userId, UserUpdateDTO userUpdateDTO)
        {
            var user = await GetUser(userId);
            if (user != null)
            {
                _mapper.Map(userUpdateDTO, user);
                await _context.SaveChangesAsync();
            }
            return user;
        }
        public async Task<User?> DeleteUser(int userId)
        {
            var user = await GetUser(userId);
            if (user != null)
            {
                user.IsDeleted = true;
                await _context.SaveChangesAsync();
            }
            return user;
        }
        public async Task<User?> ValidateUser(string email)
        {
            return await _context.Users.Where(user => user.Email == email).FirstOrDefaultAsync();
        }
    }

}