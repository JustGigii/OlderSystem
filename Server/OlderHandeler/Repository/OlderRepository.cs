using Data;
using Dto;
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

        public async Task<Orders> CreateOlder(Orders newolder)
        {
            await _context.orders.AddAsync(newolder);
            await Save();
            return newolder;

        }

        public async Task<bool> CreateOlderpordact(Olderpordact prodact)
        {
            if (prodact == null )
                throw new NullReferenceException();
            await _context.olderpordact.AddAsync(prodact);
            return await Save();
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
        public async Task<bool> Save()
        {
            return await _context.SaveChangesAsync()>0?true:false;
        }
    }
}
