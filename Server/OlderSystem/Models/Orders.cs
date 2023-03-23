using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    public class Orders
    {
        public int OlderiD { get; set; }
        public string? Title { get; set; }
        public string? Type { get; set; }
        public DateTime Date { get; set; }
        public int Status { get; set; }
        public bool Isdarft { get; set; }
        public bool IsActive { get; set; }
        public int UserId { get; set; }
        public User User { get; set; } = null!;
        public virtual ICollection<Olderpordact>? Olders { get; set; }
    }
}
