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
using OlderSystem.Dto;

namespace OlderHandeler.Controllers
{
    [Route("/Users")]
    [ApiController]
    public class UsersController : Controller
    {
        private IUser _context;
        private readonly IMapper _mapper;
        public UsersController(IMapper mapper, IUser context)
        {
            _mapper = mapper;
            _context = context;
        }

      
        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<User>))]
        public async Task<IActionResult> GetAllOlders(string id)
        {
            try
            {
                var user = await _context.GetUserDetail(id);

                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                return Ok(user);
            }
            catch (NullReferenceException)
            {
                return BadRequest(new
                {
                    status = "faild",
                    data = "the user not in the system"
                });
            }
            catch (Exception e) { return BadRequest(GlobalMethod.ProblemAtSend(e.Message)); }
        }
        [HttpPost]
        [ProducesResponseType(200, Type = typeof(User))]
        public async Task<IActionResult> CreateOlders(WirteUserDto newUser)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest(ModelState);
                var user = _mapper.Map<User>(newUser);
                return Ok(await _context.AddUser(user));

               
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
        public async Task<IActionResult> UpdateUser(User user)
        {
            try
            {
                
                return Ok(await _context.UpdateUser(user));

            }
            catch (ArgumentNullException) { return BadRequest(new { status = "faild", data = "the item already in the system" }); }
            catch (Exception e) { return BadRequest(GlobalMethod.ProblemAtSend(e.Message)); }
        }


    }
}
//{
//  "fullName": "נועם טלבי",
//  "id": "324262070",
//  "email": "noamgamliel1@gmail.com",
//  "phoneNumber": "0526202088",
//  "manageRole": 1
//}
