using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IrisAPI.CRUD.AdminCRUD;
using IrisAPI.DTO.Admin;
using IrisAPI.Models;

namespace IrisAPI.Controllers
{
    [Route("api/admins")]
    [ApiController]
    public class AdminController(IAdminCRUD adminCRUD, IMapper mapper) : ControllerBase
    {
        private readonly IAdminCRUD _adminCRUDl = adminCRUD ?? throw new ArgumentNullException(nameof(adminCRUD));
        private readonly IMapper _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));

        [Authorize(Roles = "SuperAdmin, Admin")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AdminDTO>>> GetAdmins()
        {
            var admins = await _adminCRUDl.GetAdmins();
            return Ok(_mapper.Map<IEnumerable<AdminDTO>>(admins));
        }

        [Authorize(Roles = "SuperAdmin, Admin")]
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<AdminDTO>>> GetAdmin(int id)
        {
            var userRoleClaim = User.FindFirst("role");
            if (userRoleClaim == null)
            {
                return Unauthorized();
            }

            if (userRoleClaim.Value == "Admin")
            {
                var adminIdClaim = User.FindFirst("adminId");
                if (adminIdClaim == null)
                {
                    return Unauthorized();
                }
                if (adminIdClaim.Value != id.ToString())
                {
                    return Forbid();
                }
            }

            var admin = await _adminCRUDl.GetAdmin(id);
            if (admin == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<AdminDTO>(admin));
        }

        [Authorize(Roles = "SuperAdmin")]
        [HttpPost]
        public async Task<ActionResult<AdminDTO>> CreateAdmin(AdminCreateDTO adminCreate)
        {
            try
            {
                var admin = _mapper.Map<Admin>(adminCreate);
                admin = await _adminCRUDl.CreateAdmin(admin);
                return Ok(_mapper.Map<AdminDTO>(admin));
            }
            catch (DbUpdateException ex)
            {
                return BadRequest(new { message = ex.InnerException?.Message ?? ex.Message });
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<ActionResult<AdminDTO>> UpdateAdmin(int id, AdminUpdateDTO adminUpdate)
        {
            var userRoleClaim = User.FindFirst("role");
            if (userRoleClaim == null)
            {
                return Unauthorized();
            }

            if (userRoleClaim.Value == "Admin")
            {
                var adminIdClaim = User.FindFirst("adminId");
                if (adminIdClaim == null)
                {
                    return Unauthorized();
                }
                if (adminIdClaim.Value != id.ToString())
                {
                    return Forbid();
                }
            }

            if (!await _adminCRUDl.AdminExists(id))
            {
                return NotFound();
            }

            try
            {
                var admin = await _adminCRUDl.UpdateAdmin(id, adminUpdate);
                return Ok(_mapper.Map<AdminDTO>(admin));
            }
            catch (DbUpdateException ex)
            {
                return BadRequest(new { message = ex.InnerException?.Message ?? ex.Message });
            }
        }

        [Authorize(Roles = "SuperAdmin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<AdminDTO>> DeleteAdmin(int id)
        {
            if (!await _adminCRUDl.AdminExists(id))
            {
                return NotFound();
            }

            var admin = await _adminCRUDl.DeleteAdmin(id);
            return Ok(_mapper.Map<AdminDTO>(admin));
        }
    }
}
