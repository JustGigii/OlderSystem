using Model;
using Models;
namespace Interfaces
{
    public interface ICategory
    {
        Task<int> addCategory(Category category);
        Task<bool> deleteCatgory(int id);
        Task<ICollection<Category>> getAllCategories();
        Task<bool> AddprodactToCategory(int pordactid, int cadagoryId);
        Task<ICollection<Prodact>> AllpordactInCategory(int cadagoryId);
        //Task<>
    }
}
