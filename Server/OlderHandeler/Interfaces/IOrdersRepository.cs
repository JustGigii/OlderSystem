using Models;

namespace Interfaces
{
    public interface IOrdersRepository
    {
        Task<ICollection<Orders>> GetAllOlders();
        Task<Orders> GetOrdersOlder(int id);
        Task<Olderpordact> GetProdact (int id);
        Task<Orders> CreateOlder(Orders newolder);
        Task<bool> CreateOlderpordact(Olderpordact prodact);
    }
}
