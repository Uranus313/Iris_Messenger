using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using IrisAPI.CRUD.AdminCRUD;
using IrisAPI.CRUD.UserCRUD;

namespace IrisAPI.Controllers
{
    [Route("api/authentication")]
    [ApiController]
    public class AuthenticationController(IConfiguration configuration, IUserCRUD userCRUD, IAdminCRUD adminCRUD) : ControllerBase
    {
        private readonly IConfiguration _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        private readonly IUserCRUD _userCRUD = userCRUD ?? throw new ArgumentNullException(nameof(userCRUD));
        private readonly IAdminCRUD _adminCRUD = adminCRUD ?? throw new ArgumentNullException(nameof(adminCRUD));

        [HttpPost("authenticateUser")]
        public async Task<ActionResult<string>> AuthenticateUser(string email)
        {
            var user = await _userCRUD.ValidateUser(email);
            if (user == null)
            {
                return Unauthorized();
            }

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
                DateTime.UtcNow.AddHours(1),
                signingCredientals
                );

            var token = new JwtSecurityTokenHandler().WriteToken(jwrSecurityToken);

            return Ok(token);
        }

        [HttpPost("authenticateAdmin")]
        public async Task<ActionResult<string>> AuthenticateAdmin(string email)
        {
            var admin = await _adminCRUD.ValidateAdmin(email);
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

    }
}
