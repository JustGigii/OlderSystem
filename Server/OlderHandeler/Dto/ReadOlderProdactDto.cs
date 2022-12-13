namespace OlderHandeler.Dto
{
    public class ReadOlderProdactDto
    {
        public int PordactId { get; set; }
        public Dictionary<string, int>? Sizes { get; set; }
        public ReadOlderProdactDto()
        {
            Sizes = new Dictionary<string, int>();
        }
    }
}
