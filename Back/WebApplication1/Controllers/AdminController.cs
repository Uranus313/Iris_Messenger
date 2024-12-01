using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IrisAPI.CRUD.AdminCRUD;
using IrisAPI.DTO.Admin;
using IrisAPI.Models;

namespace IrisAPI.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/admins")]
    [ApiController]
    public class AdminController(IAdminCRUD adminCRUD, IMapper mapper) : ControllerBase
    {
        private readonly IAdminCRUD _adminCRUDl = adminCRUD ?? throw new ArgumentNullException(nameof(adminCRUD));
        private readonly IMapper _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AdminDTO>>> GetAdmins()
        {
            var admins = await _adminCRUDl.GetAdmins();
            return Ok(_mapper.Map<IEnumerable<AdminDTO>>(admins));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<AdminDTO>>> GetAdmin(int id)
        {
            var admin = await _adminCRUDl.GetAdmin(id);
            if (admin == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<AdminDTO>(admin));
        }

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

        [HttpPut("{id}")]
        public async Task<ActionResult<AdminDTO>> UpdateAdmin(int id, AdminUpdateDTO adminUpdate)
        {
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
