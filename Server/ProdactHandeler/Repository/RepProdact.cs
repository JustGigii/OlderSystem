using Data;
using interfaces;
using Microsoft.EntityFrameworkCore;
using Model;

namespace Repository
{
    public class RepProdact : Iprodact
    {
        private Context _context;
        public RepProdact(Context context)
        {
            _context = context;
        }

        public async Task<int> CreateNewProdact(Prodact newPordact)
        {
            if (await _context.prodacts.AnyAsync(e => e.pordactName == newPordact.pordactName))
                return -1;
            _context.Add(newPordact);
            await Save();
            return newPordact.prodactId;
        }

        public Task DeleteProdact(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<ICollection<Prodact>> GetAllProdact()
        {
            return await _context.prodacts.Where(e => e.IsActive).ToListAsync();
        }

        public async Task<Prodact> GetPordact(int id)
        {
            return await _context.prodacts.Where(e => e.prodactId == id && e.IsActive).FirstOrDefaultAsync() ?? throw new ArgumentNullException();
        }

        public async Task<bool> UpdateProdact(Prodact UpdatePordact)
        {
            UpdatePordact.IsActive = true;
            if (!await _context.prodacts.AnyAsync(e => e.prodactId == UpdatePordact.prodactId))
                throw new ArgumentNullException();
            _context.Update(UpdatePordact);
            return await Save();
        }
        public async Task<bool> DeleteProdact(Prodact DeleteProdact)
        {
            DeleteProdact.IsActive = false;
            if (!await _context.prodacts.AnyAsync(e => e.prodactId == DeleteProdact.prodactId))
                throw new ArgumentNullException();
            _context.Update(DeleteProdact);
            return await Save();
        }


        public async Task<bool> Save()
        {
            return await _context.SaveChangesAsync() > 0 ? true : false;
        }

    }
}