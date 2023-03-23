using Models;
namespace Interfaces
{
    public interface IUser
    {
        Task<User> GetUserDetail(string id);
        Task<User> AddUser(User user);
        Task<User> UpdateUser(User user);
    }
}
