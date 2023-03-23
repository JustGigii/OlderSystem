namespace Dto
{
    public class ReadOlderProdactDto
    {
        public int PordactId { get; set; }
        public string pordactName { get; set; } = null!;
        public string prodactImage { get; set; } = null!;
        public Dictionary<string, int>? Sizes { get; set; }
        public ReadOlderProdactDto()
        {
            Sizes = new Dictionary<string, int>();
        }
    }
}
