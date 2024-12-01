using AutoMapper;

namespace IrisAPI.Profiles
{
    public class UserProfile: Profile 
    {
        public UserProfile()
    {
            CreateMap<Models.User, DTO.User.UserDTO>();
            CreateMap<Models.User, DTO.User.UserUpdateDTO>();
            CreateMap<DTO.User.UserCreateDTO, Models.User>();
            CreateMap<DTO.User.UserUpdateDTO, Models.User>();
        }
    }
}