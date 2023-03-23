using Models;

namespace Model
{
public class Prodact
{
    public int prodactId { get; set; }    
    public string pordactName { get; set; } = null!;
    public string prodactImage { get; set; }= null!;
    public int categoryId { get; set; }
    public int typeSize { get; set; }
    public bool IsActive { get; set; }
    public virtual ICollection<Olderpordact>? Prodacts { get; set; }

    }

}