using Models;

namespace Interfaces
{
    public interface IOrdersRepository
    {
        Task<ICollection<Orders>> GetAllOlders();
        Task<ICollection<Orders>> GetAllOlders(int userId);
        Task<Orders> GetOrdersOlder(int id);
        Task<ICollection<Olderpordact>> GetProdact (int id);
        Task<Orders> CreateOlder(Orders newolder);
        Task<bool> CreateOlderpordact(Olderpordact prodact);
        Task<Orders> UpdateOlder(Orders updateolder);
        Task<Olderpordact> UpdateProdacrOlder(Olderpordact updateolder);
        Task<Orders> PromoteOlders(int id);
        Task<bool> DeleteOlder(int id);
        Task<bool> DeleteOlder(Olderpordact updateolder);
    }
}
