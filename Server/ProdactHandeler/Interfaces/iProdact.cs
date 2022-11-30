using Model;
namespace interfaces
{
 public interface Iprodact{
    Task<ICollection<Prodact>> GetAllProdact();
    Task<Prodact> GetPordact(int id);
    Task<int> CreateNewProdact(Prodact newPordact);
    Task<bool> UpdateProdact(Prodact updatePordact);
    Task<bool> DeleteProdact(Prodact DeleteProdact);

 }
}