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
using Model;

namespace OlderHandeler.Controllers
{
    [Route("/Category")]
    [ApiController]
    public class CategoryController : Controller
    {
        private ICategory _context;
        private readonly IMapper _mapper;
        public CategoryController(IMapper mapper, ICategory context)
        {
            _mapper = mapper;
            _context = context;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(CatagoryDto))]
        public async Task<IActionResult> GetAllcatgoey()
        {
            try
            {
                var categories = await _context.getAllCategories();

                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                return Ok( _mapper.Map<IEnumerable<CatagoryDto>>(categories));
            }
            catch (NullReferenceException) { return NotFound(); }
            catch (Exception e) { return BadRequest(GlobalMethod.ProblemAtSend(e.Message)); }
        }
        [HttpGet("{catgory}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<UpdateOldersDto>))]
        public async Task<IActionResult> GetAllProdactInCatgory(int catgory)
        {
            try
            {
                var prodact = await _context.AllpordactInCategory(catgory);

                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                return Ok(_mapper.Map<IEnumerable<ReadPordactDto>>(prodact));
            }
            catch (NullReferenceException) { return NotFound(); }
            catch (Exception e) { return BadRequest(GlobalMethod.ProblemAtSend(e.Message)); }
        }
        [HttpPost]
        [ProducesResponseType(200, Type = typeof(WriteCatagory))]
        public async Task<IActionResult> CreateCatagory(WriteCatagory newCatgorydto)
        {
            try
            {
                var catagory =_mapper.Map<Category>(newCatgorydto);
                catagory.IsActive= true;
                int categoryId = await _context.addCategory(catagory);
                if (categoryId == -1)
                {
                    return BadRequest(new
                    {
                        status = "faild",
                        data = "the catagory already in the system"
                    });
                }
                catagory.categoryId = categoryId;
                return Ok(_mapper.Map<CatagoryDto>(catagory));
            }
            catch (NullReferenceException) { return NotFound(); }
            catch (Exception e) { return BadRequest(GlobalMethod.ProblemAtSend(e.Message)); }
            }
        [HttpPost("prodact")]
        [ProducesResponseType(200, Type = typeof(WriteProdactDto))]
        public async Task<IActionResult> AddItemToCatgory(int prodactid,int catgoryid)
        {
            try
            {
                
                var protdact = await _context.AddprodactToCategory(prodactid,catgoryid);
                if (protdact)
                    return Ok(new
                    {
                        status = "succes",
                        data = "the porfact get new catgoryfrom the system"
                    });
                throw new Exception();
            }
            catch (NullReferenceException) { return NotFound(); }
            catch (Exception e) { return BadRequest(GlobalMethod.ProblemAtSend(e.Message)); }
        }

        [HttpDelete("{catgoryid}")]
        public async Task<IActionResult> DeleteCatgory(int catgoryid)
        {
            try
            { 
                if (await _context.deleteCatgory(catgoryid))
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

    }
}