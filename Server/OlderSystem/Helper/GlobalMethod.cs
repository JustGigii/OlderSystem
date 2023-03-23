using Dto;
using Models;

namespace Helper
{
    public class GlobalMethod
    {

        public static object ProblemAtSend(string message)
        {
            Console.WriteLine(message);
            return new
            {
                status = "faild",
                data = "Error Occurred: pls contact with hupa"
            };
        }

        public static ICollection<ReadOlderProdactDto> SortPordact(List<Olderpordact> list)
        {
            var dict = new Dictionary<int, ReadOlderProdactDto>();
            var allprodact = new List<ReadOlderProdactDto>();
            foreach (var item in list)
            {
                if (!dict.ContainsKey(item.PordactId))
                {
                    dict.Add(item.PordactId, new ReadOlderProdactDto());
                    dict[item.PordactId].PordactId = item.PordactId;
                    dict[item.PordactId].pordactName = item.Prodact.pordactName;
                    dict[item.PordactId].prodactImage = item.Prodact.prodactImage;
                }
                dict[item.PordactId].Sizes.Add(item.Sizes, item.quantity); }
            foreach (var item in dict)
            {
                allprodact.Add(item.Value);
            }
            return allprodact;
        }



    }
}
