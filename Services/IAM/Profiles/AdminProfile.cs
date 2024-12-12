using AutoMapper;

namespace IrisAPI.Profiles
{
    public class AdminProfile: Profile
    {
        public AdminProfile()
        {
            CreateMap<Models.Admin, DTO.Admin.AdminDTO>();
            CreateMap<DTO.Admin.AdminCreateDTO, Models.Admin>();
            CreateMap<DTO.Admin.AdminUpdateDTO, Models.Admin>().ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
        }
    }
}
