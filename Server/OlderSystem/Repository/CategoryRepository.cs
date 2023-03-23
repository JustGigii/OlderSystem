using Data;
using Interfaces;
using Microsoft.EntityFrameworkCore;
using Model;
using Models;

namespace OlderSystem.Repository
{
    public class CategoryRepository : ICategory
    {

        private DataContext _context;
        public CategoryRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<ICollection<Prodact>> AllpordactInCategory(int cadagoryId)
        {
            return await _context.prodacts.Where(e=>e.categoryId== cadagoryId).ToListAsync() ?? throw new NullReferenceException();
        }

        public async Task<bool> Save()
        {
            return await _context.SaveChangesAsync() > 0 ? true : false;
        }

        async Task<int> ICategory.addCategory(Category category)
        {
          if(await _context.category.AnyAsync(e => e.categoryName.Equals(category.categoryName)))return -1;
            _context.category.Add(category);
            return (await Save()) ? category.categoryId : throw new Exception();
        }

        async Task<bool> ICategory.AddprodactToCategory(int pordactid, int cadagoryId)
        {
            var prodact = await _context.prodacts.FirstOrDefaultAsync(e=> e.prodactId== pordactid) ?? throw new NullReferenceException();
            prodact.categoryId = cadagoryId;
            return await Save();
        }

        async Task<bool> ICategory.deleteCatgory(int id)
        {
            var catagory = await _context.category.Where(e => e.categoryId==id).FirstOrDefaultAsync()?? throw new NullReferenceException();

            catagory.IsActive= false;
            return await Save();

        }

        async Task<ICollection<Category>> ICategory.getAllCategories()
        {
            return await _context.category.Where(e => e.IsActive == true).ToListAsync() ?? throw new NullReferenceException();
        }
    }
}
