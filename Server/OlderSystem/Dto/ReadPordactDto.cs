namespace  Dto
{
    public class ReadPordactDto
    {
        public int prodactId { get; set; }
        public string pordactName { get; set; } = null!;
        public string prodactImage { get; set; } = null!;
        public int categoryId { get; set; }
        public int typeSize { get; set; }
    }
}
