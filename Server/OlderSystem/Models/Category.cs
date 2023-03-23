using Model;
using OlderSystem.Dto;

namespace Models
{
    public class Category
    {
        public int categoryId { get; set; }
        public int categoryName { get; set; }
        public int categoryImage { get; set; }
        public bool IsActive { get; set; }
        public ICollection<Prodact>? prodacts { get; set; }
    }   
}
