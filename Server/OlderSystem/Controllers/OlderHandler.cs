using AutoMapper;
using Dto;
using Data;
using Helper;
using Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks.Dataflow;
using OlderHandeler.Dto;
using System.Collections.Generic;

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
            _mapper = mapper;
            _context = context;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<UpdateOldersDto>))]
        public async Task<IActionResult> GetAllOlders()
        {
            try
            {
                var older = await _context.GetAllOlders();

                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                return Ok(_mapper.Map<IEnumerable<UpdateOldersDto>>(older));
            }
            catch (Exception e) { return BadRequest(GlobalMethod.ProblemAtSend(e.Message)); }
        }
        [HttpGet("users/{UserId}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<UpdateOldersDto>))]
        [HttpPost]
        [ProducesResponseType(200, Type = typeof(WirteOldersDto))]
        public async Task<IActionResult> CreateOlders(WirteOldersDto newOldersdto)
        {
            try
            {

                if (!ModelState.IsValid) return BadRequest(ModelState);

                var newOlders = _mapper.Map<Orders>(newOldersdto);
                newOlders = await _context.CreateOlder(newOlders);
                var pordactobj = new Olderpordact();
                foreach (var prodact in newOldersdto.Prodact ?? throw new NullReferenceException())
                {
                    int prodactid = prodact.PordactId;
                    foreach (var item in prodact.Sizes ?? throw new NullReferenceException())
                    {
                        if (!await _context.CreateOlderpordact(new Olderpordact()
                        {
                            PordactId = prodactid,
                            OlderId = newOlders.OlderiD,
                            Sizes = item.Key,
                            quantity = item.Value
                        })) throw new Exception("CreateOlderpordact faild");
                    }

                }
                return Ok(await Tosend(newOlders.OlderiD));
            }
            catch (NullReferenceException)
            {
                return BadRequest(new
                {
                    status = "faild",
                    data = "the item already in the system"
                });
            }
            catch (Exception e) { return BadRequest(GlobalMethod.ProblemAtSend(e.Message)); }
        }


        [HttpGet("{userid}")]
        [ProducesResponseType(200, Type = typeof(ReadOldersDto))]
        [ProducesResponseType(400)]
        public async Task<IActionResult> GetoldersById(int userid, int olderId)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);
                
                if (!await CheackUser(userid, olderId)) return BadRequest(new { status = "faild", data = "you are not the user who create the orders" });
                var older = await _context.GetOrdersOlder(olderId);
                ReadOldersDto mapOlder =await Tosend(older.OlderiD);
                return Ok(mapOlder);
            }
            catch (NullReferenceException) { return NotFound(); }
            catch (Exception e) { return BadRequest(GlobalMethod.ProblemAtSend(e.Message)); }
        }

        [HttpPut("/promote{userid}")]
        public async Task<IActionResult> PromoteOlders(int userid,int olderId)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);
            
                if (!await CheackUser(userid, olderId)) return BadRequest(new { status = "faild", data = "you are not the user who create the orders" });
             
                await _context.PromoteOlders(olderId);
                return Ok(await Tosend(olderId));
            }
            catch (NullReferenceException)
            {
                return BadRequest(new
                {
                    status = "faild",
                    data = "the item already in the system"
                });
            }
            catch (Exception e) { return BadRequest(GlobalMethod.ProblemAtSend(e.Message)); }
        }
       
        [HttpDelete("{userid}")]
        public async Task<IActionResult> Deleteolder(int olderId,int userid)
        {
            try
            {
                if (!await CheackUser(userid, olderId)) return BadRequest(new { status = "faild", data = "you are not the user who create the orders" });
                  
                if (await _context.DeleteOlder(olderId))
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

        private async Task<bool> CheackUser(int userId,int olderid)
        {
            var older =await  _context.GetOrdersOlder(olderid);
            return older.UserId== userId;
        }

        //[HttpPost]
        //[Route("Iafbase")]
        //[ProducesResponseType(200, Type = typeof(WirteOldersDto))]
        //public async Task<IActionResult> older(ReadOlderProdactDto newOldersdto)
        //{
        //    try
        //    {

        //        if (!ModelState.IsValid) return BadRequest(ModelState);

        //        int prodactid = newOldersdto.PordactId;

        //        foreach (var item in newOldersdto.Sizes ?? throw new NullReferenceException())
        //        {
        //            if (!await _context.CreateOlderpordact(new Olderpordact()
        //            {
        //                PordactId = prodactid,
        //                OlderId = 2,
        //                Sizes = item.Key,
        //                quantity = item.Value
        //            })) throw new Exception("Create Older pordact faild");

        //        }
        //        return Ok("succes");
        //    }
        //    catch (NullReferenceException e) { return NotFound(); }
        //    catch (Exception e) { return BadRequest(GlobalMethod.ProblemAtSend(e.Message)); }
        //}
    }
}

//{
//    "title": "הגיגית של גיגי",
//  "type": "רגיל",
//  "date": "2022-12-26T13:10:52.745Z",
//  "status": 1,
//  "isdarft": false,
//  "prodact": [
//    {
//        "pordactId": 1,
//      "sizes": {
//            "ג": 5,
//        "ב": 2,
//        "ק": 1
//      }
//    }
//  ]
//}





//{
//    "pordactId": 1,
//      "sizes": {
//        "ג": 5,
//        "ב": 2,
//        "ק": 1
//      }
//}