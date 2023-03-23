using AutoMapper;
using Dto;
using Model;
using Models;
using OlderHandeler.Dto;
using OlderSystem.Dto;

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

            CreateMap<Prodact, WriteProdactDto>();
            CreateMap<WriteProdactDto, Prodact>();

            CreateMap<Prodact, ReadPordactDto>();
            CreateMap<ReadPordactDto, Prodact>();

            CreateMap<Prodact, UpdateProdactDto>();
            CreateMap<UpdateProdactDto, Prodact>();

            CreateMap<ReadPordactDto, WriteProdactDto>();
            CreateMap<WriteProdactDto, ReadPordactDto>();

            CreateMap<User,WirteUserDto>().ReverseMap();

            CreateMap<WriteCatagory, Category>().ReverseMap();
        }
    }
}
