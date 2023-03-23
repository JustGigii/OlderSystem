using Data;
using Dto;
using Interfaces;
using Microsoft.EntityFrameworkCore;
using Models;
using System.Data;

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
            newolder.IsActive= true;
            await Save();
            return newolder;

        }

        public async Task<bool> CreateOlderpordact(Olderpordact prodact)
        {
            if (prodact == null )
                throw new NullReferenceException();
            prodact.IsActive = true;
            await _context.olderpordacts.AddAsync(prodact);
            return await Save();
        }

        public async Task<ICollection<Orders>> GetAllOlders()
        {
            return await _context.orders.Where(e => e.IsActive ==true).ToListAsync();
        }

        public async Task<Orders> GetOrdersOlder(int id)
        {
           return await _context.orders.Include(i=> i.Olders).ThenInclude(p=> p.Prodact).FirstOrDefaultAsync(e => e.OlderiD == id&& e.IsActive == true) ?? throw new NullReferenceException();
        }

        public async Task<ICollection<Olderpordact>> GetProdact(int id)
        {
            return await _context.olderpordacts.Where(e => e.OlderId == id&& e.IsActive == true).ToListAsync();
            
        }

        public async Task<Orders> PromoteOlders(int id)
        {
          var older = await _context.orders.Include(i => i.Olders).FirstOrDefaultAsync(e => e.OlderiD == id) ?? throw new NullReferenceException();
            if (older.Status == 4)
                throw new InvalidDataException("the status in the maxmun level");
            older.Status++;
            return await Save()? older : throw new Exception("cannot succese to save");
        }

        public async Task<Orders> UpdateOlder(Orders updateolder)
        {
            var older = await GetOrdersOlder(updateolder.OlderiD);
            older.Status = updateolder.Status;
            older.Title = updateolder.Title;
            older.Date = DateTime.Now;
            older.Status = updateolder.Status;
            older.Isdarft= updateolder.Isdarft;
            older.IsActive = true;
            return await Save() ? older : throw new Exception();
            
        }
        public async Task<Olderpordact> UpdateProdacrOlder(Olderpordact updateolderprodacr)
        {
            var olderprodacrlist =await _context.olderpordacts.Where(e =>(e.Sizes.Equals(updateolderprodacr.Sizes))).ToListAsync()??  throw new ArgumentNullException();
            var olderprodacr = olderprodacrlist.Where(e => (e.OlderId == updateolderprodacr.OlderId) && (e.PordactId == updateolderprodacr.PordactId)).FirstOrDefault()?? throw new ArgumentNullException(); 
            olderprodacr.quantity = updateolderprodacr.quantity;
            olderprodacr.IsActive = true;
            return await Save() ? olderprodacr : throw new Exception();
        }
        public async Task<bool> Save()
        {
            return await _context.SaveChangesAsync()>0?true:false;
        }

        public async Task<bool> DeleteOlder(int id)
        {
            var older = await GetOrdersOlder(id);
            older.IsActive = false;
            return await Save();
        }

        public async Task<bool> DeleteOlder(Olderpordact deleteolder)
        {
            var deleteolderlist = await _context.olderpordacts.Where(e => (e.Sizes.Equals(deleteolder.Sizes))).ToListAsync() ?? throw new ArgumentNullException();
            var olderprodacr = deleteolderlist.Where(e => (e.OlderId == deleteolder.OlderId) && (e.PordactId == deleteolder.PordactId)).FirstOrDefault() ?? throw new ArgumentNullException();
            olderprodacr.IsActive = false;
            return await Save();
        }

        public async Task<ICollection<Orders>> GetAllOlders(int userId)
        {
            return await _context.orders.Where(e => e.IsActive == true&& e.UserId == userId).ToListAsync();
        }
    }
}
