using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IrisAPI.CRUD.UserCRUD;
using IrisAPI.DTO.User;
using IrisAPI.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;

namespace IrisAPI.Controllers
{
    [Route("IAM_api/users")]
    [ApiController]
    public class UserController(IConfiguration configuration, IUserCRUD userCRUD, IMapper mapper) : ControllerBase
    {

        private readonly IUserCRUD _userCRUD = userCRUD ?? throw new ArgumentNullException(nameof(userCRUD));
        private readonly IMapper _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        private readonly IConfiguration _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetUsers()
        {
            try
            {
                var users = await _userCRUD.GetUsers();
                return Ok(_mapper.Map<IEnumerable<UserDTO>>(users));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.InnerException?.Message ?? ex.Message });
            }
        }

        [Authorize(Roles = "Admin, User")]
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetUser(int id)
        {
            try
            {
                var userRoleClaim = User.FindFirst("role");
                if (userRoleClaim == null)
                {
                    return Unauthorized(new
                    {
                        message = "Access Denied"
                    });
                }

                if (userRoleClaim.Value == "User")
                {
                    var userIdClaim = User.FindFirst("userId");
                    if (userIdClaim == null)
                    {
                        return Unauthorized(new
                        {
                            message = "Access Denied"
                        });
                    }
                    if (userIdClaim.Value != id.ToString())
                    {
                        return Unauthorized(new
                        {
                            message = "Access Denied"
                        });
                    }
                }

                var user = await _userCRUD.GetUser(id);
                if (user == null)
                {
                    return NotFound(new
                    {
                        message = "Not Found"
                    });
                }

                return Ok(_mapper.Map<UserDTO>(user));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.InnerException?.Message ?? ex.Message });
            }
        }

        [Authorize(Roles = "IncompeleteUser")]
        [HttpPost]
        public async Task<ActionResult<UserDTO>> CreateUser(UserCreateDTO userCreate)
        {
            try
            {
                var userRoleClaim = User.FindFirst("role");
                if (userRoleClaim == null || userRoleClaim.Value != "IncompeleteUser" )
                {
                    return Unauthorized(new
                    {
                        message = "Access Denied"
                    });
                }

                var userEmailClaim = User.FindFirst("email");
                if (userEmailClaim == null || userEmailClaim.Value != userCreate.Email ){
                    return BadRequest("Wrong Email");
                }

                var user = _mapper.Map<User>(userCreate);
                user = await _userCRUD.CreateUser(user);

                var securityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration["Authentication:SecretKey"]));
                var signingCredientals = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

                var claimForToken = new List<Claim>
                {
                    new("userId", user.Id.ToString()),
                    new(ClaimTypes.Role, "User")
                };

                var jwrSecurityToken = new JwtSecurityToken(
                    _configuration["Authentication:Issuer"],
                    _configuration["Authentication:Audience"],
                claimForToken,
                    DateTime.UtcNow,
                    DateTime.UtcNow.AddYears(1),
                    signingCredientals
                    );
                var token = new JwtSecurityTokenHandler().WriteToken(jwrSecurityToken);

                HttpContext.Response.Cookies.Append("AuthToken", token, new CookieOptions
                {
                    HttpOnly = true,
                    Secure = false,
                    SameSite = SameSiteMode.Strict,
                    Expires = DateTime.UtcNow.AddMinutes(30)
                });

                return Ok(_mapper.Map<UserDTO>(user));
            }
            catch (DbUpdateException)
            {
                return BadRequest(new { message = "Email Or Username Inputs Already Exists" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.InnerException?.Message ?? ex.Message });
            }
        }

        [Authorize(Roles = "User")]
        [HttpPut("{id}")]
        public async Task<ActionResult<UserDTO>> UpdateUser(int id, UserUpdateDTO userUpdate)
        {
            try
            {
                var userRoleClaim = User.FindFirst("role");
                if (userRoleClaim == null)
                {
                    return Unauthorized(new
                    {
                        message = "Access Denied"
                    });
                }

                if (userRoleClaim.Value == "User")
                {
                    var userIdClaim = User.FindFirst("userId");
                    if (userIdClaim == null)
                    {
                        return Unauthorized(new
                        {
                            message = "Access Denied"
                        });
                    }
                    if (userIdClaim.Value != id.ToString())
                    {
                        return Unauthorized(new
                        {
                            message = "Access Denied"
                        });
                    }
                }

                if (!await _userCRUD.UserExists(id))
                {
                    return NotFound(new
                    {
                        message = "Not Found"
                    });
                }

                var user = await _userCRUD.UpdateUser(id, userUpdate);
                return Ok(_mapper.Map<UserDTO>(user));
            }
            catch (DbUpdateException)
            {
                return BadRequest(new { message = "Email Or Username Inputs Already Exists" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.InnerException?.Message ?? ex.Message });
            }
        }

        [Authorize(Roles = "Admin, User")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<UserDTO>> DeleteUser(int id)
        {
            try
            {
                var userRoleClaim = User.FindFirst("role");
                if (userRoleClaim == null)
                {
                    return Unauthorized(new
                    {
                        message = "Access Denied"
                    });
                }

                if (userRoleClaim.Value == "User")
                {
                    var userIdClaim = User.FindFirst("userId");
                    if (userIdClaim == null)
                    {
                        return Unauthorized(new
                        {
                            message = "Access Denied"
                        });
                    }
                    if (userIdClaim.Value != id.ToString())
                    {
                        return Unauthorized(new
                        {
                            message = "Access Denied"
                        });
                    }
                }

                if (!await _userCRUD.UserExists(id))
                {
                    return NotFound(new
                    {
                        message = "Not Found"
                    });
                }

                var user = await _userCRUD.DeleteUser(id);
                return Ok(_mapper.Map<UserDTO>(user));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.InnerException?.Message ?? ex.Message });
            }
        }
    }
}
