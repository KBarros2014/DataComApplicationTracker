using AutoMapper;
using DataComApplicationTracker.Server.Dtos;
using DataComApplicationTracker.Server.Models;

namespace DataComApplicationTracker.Server.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Application, ApplicationDto>();
            CreateMap<ApplicationDto, Application>()
            .ForMember(dest => dest.ID, opt => opt.Ignore()); 
        }
    
    }
}
