using AutoMapper;
using Dto;
using Models;
using OlderHandeler.Dto;

namespace Helper
{
    public class MappingProfile : Profile
    {

        public MappingProfile() 
        {
            CreateMap<WirteOldersDto, Orders>().ReverseMap();
            CreateMap<Orders, ReadOldersDto>();
            CreateMap<ReadOldersDto, Orders>();
            CreateMap<WriteProdactOlder, Olderpordact>();
            CreateMap<UpdateOldersDto,Orders>().ReverseMap();
        }
    }
}
