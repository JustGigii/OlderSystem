using AutoMapper;
using Dto;
using Models;

namespace Helper
{
    public class MappingProfile : Profile
    {

        public MappingProfile() 
        {
            CreateMap<WirteOldersDto, Orders>();

        }
    }
}
