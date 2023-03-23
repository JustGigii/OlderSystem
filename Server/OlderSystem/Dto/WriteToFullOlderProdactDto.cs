namespace OlderSystem.Dto
{
    public class WriteToFullOlderProdactDto
    {
        public int PordactId { get; set; }
        public Dictionary<string, int>? Sizes { get; set; }
        public WriteToFullOlderProdactDto()
        {
            Sizes = new Dictionary<string, int>();
        }

    }
}
