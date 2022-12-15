using AutoMapper;
using Dto;
using Data;
using Helper;
using Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

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
        [HttpPost]
        [ProducesResponseType(200, Type = typeof(WirteOldersDto))]
        public async Task<IActionResult> CreateOlders(WirteOldersDto newOldersdto)
         {
            try
            {

                if (!ModelState.IsValid) return BadRequest(ModelState);
            
                var newOlders = _mapper.Map<Orders>(newOldersdto);
                newOlders =await _context.CreateOlder(newOlders);
                var pordactobj =  new Olderpordact();
                foreach (var prodact in newOldersdto.Prodact?? throw new NullReferenceException())
                {
                    int prodactid = prodact.PordactId;
                    foreach (var item in prodact.Sizes ?? throw new NullReferenceException())
                    {
                        pordactobj.PordactId = prodactid;
                        pordactobj.Olders = newOlders;
                        pordactobj.OlderId = prodactid;
                        pordactobj.Sizes = item.Key;
                        if (!await _context.CreateOlderpordact(pordactobj)) throw new Exception("CreateOlderpordact faild");
                    }

                }
             

                return Ok(newOlders);
            }
            catch (Exception e) { return BadRequest(GlobalMethod.ProblemAtSend(e.Message)); }
        }
    }
}
