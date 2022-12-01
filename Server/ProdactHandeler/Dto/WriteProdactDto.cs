using Microsoft.AspNetCore.Http;

namespace Dto
{
    public class WriteProdactDto
    {
        public string pordactName { get; set; } = null!;
        public IFormFile prodactImage { get; set; } = null!;
        public int typeSize { get; set; }
    }
}
