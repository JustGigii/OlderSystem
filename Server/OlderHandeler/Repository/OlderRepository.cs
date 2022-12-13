using Data;
using Interfaces;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Repository
{
    public class OlderRepository : IOrdersRepository
    {
        private DataContext _context;
        public OlderRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<ICollection<Orders>> GetAllOlders()
        {
            return await _context.orders.ToListAsync();
        }

        public Task<Orders> GetOrdersOlder(int id)
        {
            throw new NotImplementedException();
        }

        public Task<Olderpordact> GetProdact(int id)
        {
            throw new NotImplementedException();
        }
    }
}
