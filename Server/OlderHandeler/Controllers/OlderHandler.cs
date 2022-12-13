using AutoMapper;
using Helper;
using Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace OlderHandeler.Controllers
{
    [Route("/Olders")]
    [ApiController]
    public class OlderHandler : Controller
    {
        private IOrdersRepository _context;
        private readonly IMapper _mapper;
        public OlderHandler(IMapper mapper, IOrdersRepository context)
        {
            _mapper= mapper;
            _context = context;
        }

        [HttpGet]
        //[ProducesResponseType(200, Type = typeof(IEnumerable<OlderHandeler>))]
        public async Task<IActionResult> GetBase()
        {
            try
            {
                var older = await _context.GetAllOlders();

                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                return Ok(older);
            }
            catch (Exception e) { return BadRequest(GlobalMethod.ProblemAtSend(e.Message)); }
        }
    }
}
