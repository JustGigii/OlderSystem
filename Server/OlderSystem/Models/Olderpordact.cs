using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Model;

namespace Models
{
    public class Olderpordact
    {
        public int tranctionId { get; set; }
        public int PordactId { get; set; }
        public int OlderId { get; set; }
        public string? Sizes { get; set; }
        public int quantity { get; set; }
        public bool IsActive { get; set; }
        public virtual Orders? Older { get; set; }
        public virtual Prodact? Prodact { get; set; }
    }
}
