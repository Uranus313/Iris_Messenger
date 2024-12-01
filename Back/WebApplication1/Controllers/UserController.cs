using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IrisAPI.CRUD.UserCRUD;
using IrisAPI.DTO.User;
using IrisAPI.Models;

namespace IrisAPI.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController(IUserCRUD userCRUD, IMapper mapper) : ControllerBase
    {

        private readonly IUserCRUD _userCRUDl = userCRUD ?? throw new ArgumentNullException(nameof(userCRUD));
        private readonly IMapper _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetUsers()
        {
            var users = await _userCRUDl.GetUsers();
            return Ok(_mapper.Map<IEnumerable<UserDTO>>(users));
        }

        [Authorize(Roles = "Admin, User")]
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetUser(int id)
        {
            var userIdClaim = User.FindFirst("userId");
            if (userIdClaim == null)
            {
                return Unauthorized();
            }

            var user = await _userCRUDl.GetUser(id);
            if (user == null)
            {
                return NotFound();
            }

            if (userIdClaim.Value != id.ToString())
            {
                return Unauthorized();
            }

            return Ok(_mapper.Map<UserDTO>(user));
        }

        [HttpPost]
        public async Task<ActionResult<UserDTO>> CreateUser(UserCreateDTO userCreate)
        {
            try
            {
                var user = _mapper.Map<User>(userCreate);
                user = await _userCRUDl.CreateUser(user);
                return Ok(_mapper.Map<UserDTO>(user));
            }
            catch (DbUpdateException ex)
            {
                return BadRequest(new { message = ex.InnerException?.Message ?? ex.Message });
            }
        }

        [Authorize(Roles = "Admin, User")]
        [HttpPut("{id}")]
        public async Task<ActionResult<UserDTO>> UpdateUser(int id, UserUpdateDTO userUpdate)
        {
            var userIdClaim = User.FindFirst("userId");
            if (userIdClaim == null)
            {
                return Unauthorized();
            }

            if (! await _userCRUDl.UserExists(id))
            {
                return NotFound();
            }

            if (userIdClaim.Value != id.ToString())
            {
                return Unauthorized();
            }

            try
            {
                var user = await _userCRUDl.UpdateUser(id, userUpdate);
                return Ok(_mapper.Map<UserDTO>(user));
            }
            catch (DbUpdateException ex)
            {
                return BadRequest(new { message = ex.InnerException?.Message ?? ex.Message });
            }
        }

        [Authorize(Roles = "Admin, User")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<UserDTO>> DeleteUser(int id)
        {
            var userIdClaim = User.FindFirst("userId");
            if (userIdClaim == null)
            {
                return Unauthorized();
            }

            if (!await _userCRUDl.UserExists(id))
            {
                return NotFound();
            }

            if (userIdClaim.Value != id.ToString())
            {
                return Unauthorized();
            }

            var user = await _userCRUDl.DeleteUser(id);
            return Ok(_mapper.Map<UserDTO>(user));
        }
    }
}
