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



                return Ok(Tosend(newOlders));
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

        [HttpGet("{olderId}")]
        [ProducesResponseType(200, Type = typeof(ReadOldersDto))]
        [ProducesResponseType(400)]
        public async Task<IActionResult> GetoldersById(int olderId)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);
                var older = await _context.GetOrdersOlder(olderId);
                ReadOldersDto mapOlder = Tosend(older);
                return Ok(mapOlder);
            }
            catch (NullReferenceException) { return NotFound(); }
            catch (Exception e) { return BadRequest(GlobalMethod.ProblemAtSend(e.Message)); }
        }

        [HttpPut("/promote{olderId}")]
        public async Task<IActionResult> PromoteOlders(int olderId)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);
                return Ok(Tosend(await _context.PromoteOlders(olderId)));
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
        [HttpPut]
        public async Task<IActionResult> UpdateProdact(UpdateOldersDto olderDto)
        {
            try
            {

                var update = await _context.UpdateOlder(_mapper.Map<Orders>(olderDto));
                return Ok(Tosend(update));

            }
            catch (Exception e) { return BadRequest(GlobalMethod.ProblemAtSend(e.Message)); }
        }
        [HttpPut("/prodact")]
        public async Task<IActionResult> UpdateProdact(WriteProdactOlder olderProdactDto)
            {
                try
                {
                    var update = await _context.UpdateProdacrOlder(_mapper.Map<Olderpordact>(olderProdactDto));
                    return Ok(_mapper.Map<WriteProdactOlder>(update));

                }
            catch (ArgumentNullException) { return BadRequest(new { status = "faild", data = "the item already in the system" }); }
            catch (Exception e) { return BadRequest(GlobalMethod.ProblemAtSend(e.Message)); }
            }

          private ReadOldersDto Tosend(Orders older)
            {
            var prodactInOlders = older.Olders;
            var mapOlder = _mapper.Map<ReadOldersDto>(older);
            if (prodactInOlders is object && prodactInOlders.Count > 0)
            {
                mapOlder.Prodact = GlobalMethod.SortPordact(prodactInOlders.ToList());
            }

            return mapOlder;
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