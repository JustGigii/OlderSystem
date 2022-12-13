using Models;

namespace Interfaces
{
    public interface IOrdersRepository
    {
        Task<ICollection<Orders>> GetAllOlders();
        Task<Orders> GetOrdersOlder(int id);
        Task<Olderpordact> GetProdact (int id); 
    }
}
