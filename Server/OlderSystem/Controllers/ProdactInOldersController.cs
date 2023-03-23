using AutoMapper;
using Dto;
using Helper;
using Interfaces;
using Microsoft.AspNetCore.Mvc;
using Models;
using OlderHandeler.Dto;

namespace OlderSystem.Controllers
{
    [Route("/PordactInOlders")]
    [ApiController]
    public class ProdactInOldersController : Controller
    {
        private IOrdersRepository _context;
        private readonly IMapper _mapper;
        public ProdactInOldersController(IMapper mapper, IOrdersRepository context)
        {
            _mapper = mapper;
            _context = context;
        }
        
        [HttpPut("{userid}")]
        public async Task<IActionResult> UpdateOlder(int userid, UpdateOldersDto olderDto)
        {
            try
            {

                if (!await CheackUser(userid, olderDto.OlderiD)) return BadRequest(new { status = "faild", data = "you are not the user who create the orders" });
                var update = await _context.UpdateOlder(_mapper.Map<Orders>(olderDto));
                return Ok(await Tosend(update.OlderiD));

            }
            catch (Exception e) { return BadRequest(GlobalMethod.ProblemAtSend(e.Message)); }
        }
        [HttpPut("prodact/{userid}")]
        public async Task<IActionResult> UpdateProdact(int userid, WriteProdactOlder olderProdactDto)
        {
            try
            {
                if (!await CheackUser(userid, olderProdactDto.OlderId)) return BadRequest(new { status = "faild", data = "you are not the user who create the orders" });
                var update = await _context.UpdateProdacrOlder(_mapper.Map<Olderpordact>(olderProdactDto));
                return Ok(_mapper.Map<WriteProdactOlder>(update));

            }
            catch (ArgumentNullException) { return BadRequest(new { status = "faild", data = "the item already in the system" }); }
            catch (Exception e) { return BadRequest(GlobalMethod.ProblemAtSend(e.Message)); }
        }
        [HttpDelete("prodact/{userid}")]
        public async Task<IActionResult> DeleteProdact(int userid, WriteProdactOlder olderProdactDto)
        {
            try
            {
                if (!await CheackUser(userid, olderProdactDto.OlderId)) return BadRequest(new { status = "faild", data = "you are not the user who create the orders" });
                if (await _context.DeleteOlder(_mapper.Map<Olderpordact>(olderProdactDto)))
                    return Ok(new
                    {
                        status = "succes",
                        data = "the item delete from the system"
                    });
                throw new Exception();

            }
            catch (ArgumentNullException) { return NotFound(new { status = "faild", data = "the item not in the system" }); }
            catch (Exception e) { return BadRequest(GlobalMethod.ProblemAtSend(e.Message)); }
        }

        private async Task<ReadOldersDto> Tosend(int olderid)
        {
            var older = await _context.GetOrdersOlder(olderid);
            var prodactInOlders = older.Olders;
            var mapOlder = _mapper.Map<ReadOldersDto>(older);
            if (prodactInOlders is object && prodactInOlders.Count > 0)
            {
                mapOlder.Prodact = GlobalMethod.SortPordact(prodactInOlders.ToList());
            }

            return mapOlder;
        }

        private async Task<bool> CheackUser(int userId, int olderid)
        {
            var older = await _context.GetOrdersOlder(olderid);
            return older.UserId == userId;
        }
    }
}
