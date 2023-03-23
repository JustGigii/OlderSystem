using OlderSystem.Dto;

namespace Dto
{
    public class WirteOldersDto
    {
        public string? Title { get; set; }
        public int UserId { get; set; }
        public string? Type { get; set; }
        public DateTime Date { get; set; }
        public int Status { get; set; }
        public bool Isdarft { get; set; }
        public ICollection<WriteToFullOlderProdactDto>? Prodact { get; set; }
    }
}
