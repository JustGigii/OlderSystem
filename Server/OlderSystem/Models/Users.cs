namespace Models
{
    public class User
    {
        public int UserId { get; set; }
        public string fullName { get; set; } = null!;
        public string ID { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string phoneNumber { get; set; } = null!;
        public int manageRole { get; set; }
    }
}
