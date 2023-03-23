using Model;
namespace interfaces
{
 public interface Iprodact{
    Task<ICollection<Prodact>> GetAllProdact();
    Task<Prodact> GetPordact(int id);
    Task<string> UploadToAzure(IFormFile file);
    Task<int> CreateNewProdact(Prodact newPordact);
    Task<Prodact> UpdateProdact(Prodact updatePordact);
    Task<bool> DeleteProdact(Prodact DeleteProdact);
    Task<Prodact> UpdateImage(int prodactId, IFormFile image);
    }
}