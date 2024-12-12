using AutoMapper;

namespace IrisAPI.Profiles
{
    public class SuperAdminProfile : Profile
    {
        public SuperAdminProfile() 
        {
            CreateMap<Models.SuperAdmin, DTO.SuperAdmin.SuperAdminDTO>();
        }
    }
}