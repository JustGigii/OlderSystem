using AutoMapper;
using Model;
using Dto;

namespace Helper
{
    public class MappingProfile : Profile
    {

        public MappingProfile() 
        {
            CreateMap<Prodact, WriteProdactDto>();
            CreateMap<WriteProdactDto, Prodact>();

            CreateMap<Prodact, ReadPordactDto>();
            CreateMap<ReadPordactDto, Prodact>();

            CreateMap<Prodact, UpdateProdactDto>();
            CreateMap<UpdateProdactDto, Prodact>();

            CreateMap<ReadPordactDto, WriteProdactDto>();
            CreateMap<WriteProdactDto, ReadPordactDto>();
        }
    }
}
