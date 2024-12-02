using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using IrisAPI.CRUD.AdminCRUD;
using IrisAPI.CRUD.UserCRUD;
using IrisAPI.CRUD.SuperAdminCRUD;
using IrisAPI.CRUD.OTPCRUD;
using System.Net;

namespace IrisAPI.Controllers
{
    [Route("api/authentication")]
    [ApiController]
    public class AuthenticationController(IConfiguration configuration, IUserCRUD userCRUD, IAdminCRUD adminCRUD, ISuperAdminCRUD superAdminCRUD, IOTPCRUD OTPCRUD) : ControllerBase
    {
        private readonly IConfiguration _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        private readonly IUserCRUD _userCRUD = userCRUD ?? throw new ArgumentNullException(nameof(userCRUD));
        private readonly IAdminCRUD _adminCRUD = adminCRUD ?? throw new ArgumentNullException(nameof(adminCRUD));
        private readonly ISuperAdminCRUD _superAdminCRUD = superAdminCRUD ?? throw new ArgumentNullException(nameof(superAdminCRUD));
        private readonly IOTPCRUD _OTPCRUD = OTPCRUD ?? throw new ArgumentNullException(nameof(OTPCRUD));


        [HttpPost("CreateOTP")]
        public async Task<ActionResult<bool>> CreateOTP(string email)
        {
            var isSent = await _OTPCRUD.CreateOTP(email);
            if (isSent == false)
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpPost("authenticateUser")]
        public async Task<ActionResult<string>> AuthenticateUser(string email, string verificationCode)
        {
            var isVerified = await _OTPCRUD.ValidateCreditentials(email, verificationCode);
            if (isVerified == false)
            {
                return Unauthorized();
            }
            var securityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration["Authentication:SecretKey"]));
            var signingCredientals = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var userStatus = "NewUser";

            var user = await _userCRUD.ValidateUser(email);
            if (user == null)
            {
                var incomepleteClaimForToken = new List<Claim>
            {
                new("email", email),
                new(ClaimTypes.Role, "IncompeleteUser")

            };

                var incompeleteJwtSecurityToken = new JwtSecurityToken(
                    _configuration["Authentication:Issuer"],
                    _configuration["Authentication:Audience"],
                    incomepleteClaimForToken,
                    DateTime.UtcNow,
                    DateTime.UtcNow.AddMinutes(30),
                    signingCredientals
                    );
                var incompeleteToken = new JwtSecurityTokenHandler().WriteToken(incompeleteJwtSecurityToken);

                Response.Headers.Add("Token", incompeleteToken);
                return Ok(new
                {
                    UserState = userStatus
                });
            }

            userStatus = "OldUser";



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
                DateTime.UtcNow.AddHours(1),
                signingCredientals
                );

            var token = new JwtSecurityTokenHandler().WriteToken(jwrSecurityToken);
            Response.Headers.Add("Token", token);

            return Ok(new
            {
                UserState = userStatus,
                User = user
            });
        }

        [HttpPost("authenticateAdmin")]
        public async Task<ActionResult<string>> AuthenticateAdmin(string email, string password)
        {
            var admin = await _adminCRUD.ValidateAdmin(email, password);
            if (admin == null)
            {
                return Unauthorized();
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
                DateTime.UtcNow.AddHours(1),
                signingCredientals
                );

            var token = new JwtSecurityTokenHandler().WriteToken(jwrSecurityToken);

            return Ok(token);
        }

        [HttpPost("authenticateSuperAdmin")]
        public async Task<ActionResult<string>> AuthenticateSuperAdmin(string email, string password)
        {
            var superAdmin = await _superAdminCRUD.ValidateSuperAdmin(email, password);
            if (superAdmin == null)
            {
                return Unauthorized();
            }

            var securityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration["Authentication:SecretKey"]));
            var signingCredientals = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claimForToken = new List<Claim>
            {
                new("superAdminId", superAdmin.Id.ToString()),
                new(ClaimTypes.Role, "superAdmin")
            };

            var jwrSecurityToken = new JwtSecurityToken(
                _configuration["Authentication:Issuer"],
                _configuration["Authentication:Audience"],
                claimForToken,
                DateTime.UtcNow,
                DateTime.UtcNow.AddHours(1),
                signingCredientals
                );

            var token = new JwtSecurityTokenHandler().WriteToken(jwrSecurityToken);

            return Ok(token);
        }

    }
}
