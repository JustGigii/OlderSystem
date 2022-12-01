using Microsoft.AspNetCore.Mvc;
using interfaces;
using Model;
using Helper;
using AutoMapper;
using Dto;


namespace Controllers
{
    [ApiController]
    [Route("/Prodact")]
    public class ProdactCon : Controller
    {
        private readonly Iprodact _prodact;
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;
        public ProdactCon(Iprodact prodact, IMapper mapper, IConfiguration config)
        {
            _prodact = prodact;
            _mapper = mapper;
            _config = config;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<ReadPordactDto>))]
        public async Task<IActionResult> GetAllProdacts()
        {
            try
            {
                var prodacts = _mapper.Map<List<ReadPordactDto>>(await _prodact.GetAllProdact());
                return Ok(prodacts);
            }
            catch (Exception e) { return BadRequest(GlobalMethod.ProblemAtSend(e.Message)); }

        }
        [HttpGet("prodactid")]
        [ProducesResponseType(200, Type = typeof(ReadPordactDto))]
        public async Task<IActionResult> GetProdact(int prodactid)
        {
            try
            {
                var prodact = _mapper.Map<ReadPordactDto>(await _prodact.GetPordact(prodactid));
                return Ok(prodact);
            }
            catch (ArgumentNullException)
            {
                return NotFound();
            }
            catch (Exception e) { return BadRequest(GlobalMethod.ProblemAtSend(e.Message)); }
        }

        [HttpPost]
        public async Task<IActionResult> AddProdact(WriteProdactDto prodactDto)
        {
            try
            {
                var prodact = _mapper.Map<Prodact>(prodactDto);
                prodact.IsActive = true;
                //int newprodactId = await _prodact.CreateNewProdact(prodact);
                int newprodactId = 1;
                if (newprodactId == -1)
                {
                    return BadRequest(new
                    {
                        status = "faild",
                        data = "the item already in the system"
                    });
                }
                prodact.prodactId = newprodactId;
                return Ok(_mapper.Map<ReadPordactDto>(prodact));
            }
            catch (Exception e) { return BadRequest(GlobalMethod.ProblemAtSend(e.Message)); }

        }
        [HttpDelete]
        public async Task<IActionResult> RemoveProdact(int prodactid)
        {
            try
            {
                var prodact =await _prodact.GetPordact(prodactid);
                if ( await _prodact.DeleteProdact(prodact) ) {
                    return BadRequest(new
                    {
                        status = "succes",
                        data = "the item delete from the system"
                    });
                }
                throw new Exception();
            }
            catch (ArgumentNullException)
            {
                return NotFound();
            }
            catch (Exception e) { return BadRequest(GlobalMethod.ProblemAtSend(e.Message)); }
        }
        [HttpPut]
        public async Task<IActionResult> UpdateProdact(ReadPordactDto prodactDto)
        {
            try
            {

                var prodact = _mapper.Map<Prodact>(prodactDto);
                if (await _prodact.UpdateProdact(prodact))
                {
                return Ok(_mapper.Map<ReadPordactDto>(prodact));
                }
                    return BadRequest(new
                    {
                        status = "faild",
                        data = "the item already in the system"
                    });
            }
            catch (Exception e) { return BadRequest(GlobalMethod.ProblemAtSend(e.Message)); }

        }
    }
}