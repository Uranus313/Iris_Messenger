using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IrisAPI.CRUD.AdminCRUD;
using IrisAPI.DTO.Admin;
using IrisAPI.Models;

namespace IrisAPI.Controllers
{
    [Route("IAM_api/admins")]
    [ApiController]
    public class AdminController(IAdminCRUD adminCRUD, IMapper mapper) : ControllerBase
    {
        private readonly IAdminCRUD _adminCRUDl = adminCRUD ?? throw new ArgumentNullException(nameof(adminCRUD));
        private readonly IMapper _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));

        [Authorize(Roles = "SuperAdmin, Admin")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AdminDTO>>> GetAdmins()
        {
            try
            {
                var admins = await _adminCRUDl.GetAdmins();
                return Ok(_mapper.Map<IEnumerable<AdminDTO>>(admins));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.InnerException?.Message ?? ex.Message });
            }
        }

        [Authorize(Roles = "SuperAdmin, Admin")]
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<AdminDTO>>> GetAdmin(int id)
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
                    if (adminIdClaim.Value != id.ToString())
                    {
                        return Unauthorized(new
                        {
                            message = "Access Denied"
                        });
                    }
                }

                var admin = await _adminCRUDl.GetAdmin(id);
                if (admin == null)
                {
                    return NotFound(new
                    {
                        message = "Not Found"
                    });
                }
                return Ok(_mapper.Map<AdminDTO>(admin));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.InnerException?.Message ?? ex.Message });
            }
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
            catch (DbUpdateException)
            {
                return BadRequest(new { message = "Email Inputs Already Exists" });
            }
            catch (Exception ex)
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
                return Unauthorized(new
                {
                    message = "Access Denied"
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
                if (adminIdClaim.Value != id.ToString())
                {
                    return Unauthorized(new
                    {
                        message = "Access Denied"
                    });
                }
            }

            if (!await _adminCRUDl.AdminExists(id))
            {
                return NotFound(new
                {
                    message = "Not Found"
                });
            }

            try
            {
                var admin = await _adminCRUDl.UpdateAdmin(id, adminUpdate);
                return Ok(_mapper.Map<AdminDTO>(admin));
            }
            catch (DbUpdateException)
            {
                return BadRequest(new { message = "Email Already Exists" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.InnerException?.Message ?? ex.Message });
            }
        }

        [Authorize(Roles = "SuperAdmin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<AdminDTO>> DeleteAdmin(int id)
        {
            try
            {
                if (!await _adminCRUDl.AdminExists(id))
                {
                    return NotFound(new
                    {
                        message = "Not Found"
                    });
                }

                var admin = await _adminCRUDl.DeleteAdmin(id);
                return Ok(_mapper.Map<AdminDTO>(admin));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.InnerException?.Message ?? ex.Message });
            }
        }
    }
}
