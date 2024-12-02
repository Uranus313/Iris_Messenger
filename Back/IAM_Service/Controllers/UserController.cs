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
            var userRoleClaim = User.FindFirst("role");
            if (userRoleClaim == null)
            {
                return Unauthorized();
            }
            
            if (userRoleClaim.Value == "User") {
                var userIdClaim = User.FindFirst("userId");
                if (userIdClaim == null)
                {
                    return Unauthorized();
                }
                if (userIdClaim.Value != id.ToString())
                {
                    return Forbid();
                }
            }

            var user = await _userCRUDl.GetUser(id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<UserDTO>(user));
        }
        [Authorize(Roles="IncompeleteUser")]
        [HttpPost]
        public async Task<ActionResult<UserDTO>> CreateUser(UserCreateDTO userCreate)
        {
            try
            {
                var userRoleClaim = User.FindFirst("role");
                var userEmailClaim = User.FindFirst("email");
                if (userRoleClaim == null || userRoleClaim.Value != "IncompeleteUser" )
                {
                    return Unauthorized();
                }
                if(userEmailClaim == null){
                    return BadRequest("wrong email");

                }
                if(userEmailClaim.Value != userCreate.Email ){
                    return BadRequest("wrong email");
                }
                var user = _mapper.Map<User>(userCreate);
                user = await _userCRUDl.CreateUser(user);
                return Ok(_mapper.Map<UserDTO>(user));
            }
            catch (DbUpdateException ex)
            {
                return BadRequest(new { message = ex.InnerException?.Message ?? ex.Message });
            }
        }

        [Authorize(Roles = "User")]
        [HttpPut("{id}")]
        public async Task<ActionResult<UserDTO>> UpdateUser(int id, UserUpdateDTO userUpdate)
        {
            var userRoleClaim = User.FindFirst("role");
            if (userRoleClaim == null)
            {
                return Unauthorized();
            }

            if (userRoleClaim.Value == "User")
            {
                var userIdClaim = User.FindFirst("userId");
                if (userIdClaim == null)
                {
                    return Unauthorized();
                }
                if (userIdClaim.Value != id.ToString())
                {
                    return Forbid();
                }
            }

            if (!await _userCRUDl.UserExists(id))
            {
                return NotFound();
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
            var userRoleClaim = User.FindFirst("role");
            if (userRoleClaim == null)
            {
                return Unauthorized();
            }

            if (userRoleClaim.Value == "User")
            {
                var userIdClaim = User.FindFirst("userId");
                if (userIdClaim == null)
                {
                    return Unauthorized();
                }
                if (userIdClaim.Value != id.ToString())
                {
                    return Forbid();
                }
            }

            if (!await _userCRUDl.UserExists(id))
            {
                return NotFound();
            }

            var user = await _userCRUDl.DeleteUser(id);
            return Ok(_mapper.Map<UserDTO>(user));
        }
    }
}
