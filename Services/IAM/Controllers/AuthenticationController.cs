using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using IrisAPI.CRUD.AdminCRUD;
using IrisAPI.CRUD.UserCRUD;
using IrisAPI.CRUD.SuperAdminCRUD;
using IrisAPI.CRUD.OTPCRUD;
using Microsoft.EntityFrameworkCore;
using IrisAPI.DTO.Admin;
using IrisAPI.DTO.User;
using IrisAPI.DTO.SuperAdmin;
using IrisAPI.DTO.OTP;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;

namespace IrisAPI.Controllers
{
    [Route("IAM_api/authentication")]
    [ApiController]
    public class AuthenticationController(IConfiguration configuration, IUserCRUD userCRUD, IAdminCRUD adminCRUD, ISuperAdminCRUD superAdminCRUD, IOTPCRUD OTPCRUD, IMapper mapper) : ControllerBase
    {
        private readonly IConfiguration _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        private readonly IUserCRUD _userCRUD = userCRUD ?? throw new ArgumentNullException(nameof(userCRUD));
        private readonly IAdminCRUD _adminCRUD = adminCRUD ?? throw new ArgumentNullException(nameof(adminCRUD));
        private readonly ISuperAdminCRUD _superAdminCRUD = superAdminCRUD ?? throw new ArgumentNullException(nameof(superAdminCRUD));
        private readonly IOTPCRUD _OTPCRUD = OTPCRUD ?? throw new ArgumentNullException(nameof(OTPCRUD));
        private readonly IMapper _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));


        [HttpPost("createOTP")]
        public async Task<ActionResult<bool>> CreateOTP(OTPRequestDTO OTPRequestDTO)
        {
            try
            {
                await _OTPCRUD.CreateOTP(OTPRequestDTO.Email);

                return Ok(new 
                {
                    message = "Email Sent"
                });
            }
            catch (DbUpdateException)
            {
                return BadRequest(new { message = "OTP For This Email Is Still Valid"});
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.InnerException?.Message ?? ex.Message });
            }
        }

        [Authorize]
        [HttpPost("checkToken")]
        public async Task<ActionResult> CheckToken()
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

                    var user = await _userCRUD.GetUser(int.Parse(userIdClaim.Value));
                    if (user == null)
                    {
                        return NotFound(new
                        {
                            message = "Not Found"
                        });
                    }

                    return Ok(new 
                    {
                        user = _mapper.Map<UserDTO>(user),
                        userRole = "User"
                    });
                }

                if (userRoleClaim.Value == "Admin")
                {
                    var adminIdClaim = User.FindFirst("adminId");
                    if (adminIdClaim == null)
                    {
                        return Unauthorized(new
                        {
                            message = "Access Denied"
                        });
                    }

                    var admin = await _adminCRUD.GetAdmin(int.Parse(adminIdClaim.Value));
                    if (admin == null)
                    {
                        return NotFound(new
                        {
                            message = "Not Found"
                        });
                    }

                    return Ok(new
                    {
                        admin = _mapper.Map<AdminDTO>(admin),
                        userRole = "Admin"
                    });
                }

                if (userRoleClaim.Value == "SuperAdmin")
                {
                    var superAdminIdClaim = User.FindFirst("superAdminId");
                    if (superAdminIdClaim == null)
                    {
                        return Unauthorized(new
                        {
                            message = "Access Denied"
                        });
                    }

                    var superAdmin = await _superAdminCRUD.GetSuperAdmin(int.Parse(superAdminIdClaim.Value));
                    if (superAdmin == null)
                    {
                        return NotFound(new
                        {
                            message = "Not Found"
                        });
                    }

                    return Ok(new
                    {
                        superAdmin = _mapper.Map<SuperAdminDTO>(superAdmin),
                        userRole = "SuperAdmin"
                    });
                }

                return Unauthorized(new
                {
                    message = "Access Denied"
                });
            }
            catch (DbUpdateException)
            {
                return BadRequest(new { message = "OTP For This Email Is Still Valid" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.InnerException?.Message ?? ex.Message });
            }
        }

        [HttpPost("authenticateUser")]
        public async Task<ActionResult> AuthenticateUser(UserRequestDTO userRequestDTO)
        {
            try
            {
                var isVerified = await _OTPCRUD.ValidateCreditentials(userRequestDTO.Email, userRequestDTO.VerificationCode);
                if (isVerified == false)
                {
                    return Unauthorized(new
                    {
                        message = "Access Denied"
                    });
                }

                var securityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration["Authentication:SecretKey"]));
                var signingCredientals = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

                var user = await _userCRUD.ValidateUser(userRequestDTO.Email);
                if (user == null)
                {
                    var incomepleteClaimForToken = new List<Claim>
                    {
                        new("email", userRequestDTO.Email),
                        new(ClaimTypes.Role, "IncompeleteUser")
                    };

                    var incompleteJwtSecurityToken = new JwtSecurityToken(
                        _configuration["Authentication:Issuer"],
                        _configuration["Authentication:Audience"],
                        incomepleteClaimForToken,
                        DateTime.UtcNow,
                        DateTime.UtcNow.AddMinutes(30),
                        signingCredientals
                        );
                    var incompleteToken = new JwtSecurityTokenHandler().WriteToken(incompleteJwtSecurityToken);

                    HttpContext.Response.Cookies.Append("AuthToken", incompleteToken, new CookieOptions
                    {
                        HttpOnly = true,
                        Secure = false,
                        SameSite = SameSiteMode.Strict,
                        Expires = DateTime.UtcNow.AddMinutes(30)
                    });

                    return Ok(new
                    {
                        message = "Authentication Successful",
                        userState = "NewUser",
                    });
                }

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

                return Ok(new
                {
                    message = "Authentication successful",
                    userState = "OldUser",
                    user
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.InnerException?.Message ?? ex.Message });
            }
        }

        [HttpPost("authenticateAdmin")]
        public async Task<ActionResult> AuthenticateAdmin(AdminRequestDTO adminRequestDTO)
        {
            try
            {
                var admin = await _adminCRUD.ValidateAdmin(adminRequestDTO.Email, adminRequestDTO.Password);
                if (admin == null)
                {
                    return Unauthorized(new
                    {
                        message = "Access Denied"
                    });
                }

                var securityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration["Authentication:SecretKey"]));
                var signingCredientals = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

                var claimForToken = new List<Claim>
                {
                    new("adminId", admin.Id.ToString()),
                    new(ClaimTypes.Role, "Admin")
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

                return Ok(new { message = "Authentication successful"});
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.InnerException?.Message ?? ex.Message });
            }
        }

        [HttpPost("authenticateSuperAdmin")]
        public async Task<ActionResult> AuthenticateSuperAdmin(SuperAdminRequestDTO superAdminRequestDTO)
        {
            try
            {
                var superAdmin = await _superAdminCRUD.ValidateSuperAdmin(superAdminRequestDTO.Email, superAdminRequestDTO.Password);
                if (superAdmin == null)
                {
                    return Unauthorized(new
                    {
                        message = "Access Denied"
                    });
                }

                var securityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration["Authentication:SecretKey"]));
                var signingCredientals = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

                var claimForToken = new List<Claim>
                {
                    new("superAdminId", superAdmin.Id.ToString()),
                    new(ClaimTypes.Role, "SuperAdmin")
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

                return Ok(new { message = "Authentication successful"});
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.InnerException?.Message ?? ex.Message });
            }
        }
    }
}
