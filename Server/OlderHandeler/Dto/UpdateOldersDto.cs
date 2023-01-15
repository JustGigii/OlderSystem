namespace OlderHandeler.Dto
{
    public class UpdateOldersDto
    {
        public int OlderiD { get; set; }
        public string? Title { get; set; }
        public string? Type { get; set; }
        //public DateTime Date { get; set; }
        public int Status { get; set; }
        public bool Isdarft { get; set; }
    }
}
