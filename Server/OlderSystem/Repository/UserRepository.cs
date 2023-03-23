using Data;
using Interfaces;
using Microsoft.EntityFrameworkCore;
using Models;

namespace OlderSystem.Repository
{
    public class UserRepository : IUser
    {

        private DataContext _context;
        public UserRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<User> AddUser(User user)
        {
            await _context.Users.AddAsync(user);
            await Save();
            return user;
        }

        public async Task<User> GetUserDetail(string id)
        {
           return await _context.Users.Where(e => e.ID.Equals(id)).FirstOrDefaultAsync()?? throw new NullReferenceException();
        }

        public async Task<User> UpdateUser(User user)
        {
            var updateUser = await _context.Users.Where(e => e.UserId == user.UserId).FirstOrDefaultAsync() ?? throw new NullReferenceException();
            updateUser.phoneNumber = user.phoneNumber;
            updateUser.fullName = user.fullName;
            updateUser.ID= user.ID;
            updateUser.Email= user.Email;
            return await Save() ? user : throw new Exception();


        }
        public async Task<bool> Save()
        {
            return await _context.SaveChangesAsync() > 0 ? true : false;
        }

    }
}
