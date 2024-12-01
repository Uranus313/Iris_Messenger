using AutoMapper;

namespace IrisAPI.Profiles
{
    public class AdminProfile: Profile
    {
        public AdminProfile()
        {
            CreateMap<Models.Admin, DTO.Admin.AdminDTO>();
            CreateMap<Models.Admin, DTO.Admin.AdminUpdateDTO>();
            CreateMap<DTO.Admin.AdminCreateDTO, Models.Admin>();
            CreateMap<DTO.Admin.AdminUpdateDTO, Models.Admin>();
        }
    }
}
