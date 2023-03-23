using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Dto
{
    public class WriteProdactDto
    {
        public string pordactName { get; set; } = null!;
        public IFormFile prodactImage { get; set; } = null!;
        public int typeSize { get; set; }
        public int categoryId { get; set; }
    }
}
