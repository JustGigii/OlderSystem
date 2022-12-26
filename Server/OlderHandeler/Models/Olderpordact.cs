namespace Models
{
    public class Olderpordact
    {
        public int PordactId { get; set; }
        public int OlderId { get; set; }
        public string? Sizes { get; set; }
        public int quantity { get; set; }
        public virtual Orders? Olders { get; set; }
    }
}
