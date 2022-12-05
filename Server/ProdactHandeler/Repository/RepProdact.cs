using Azure.Storage.Blobs;
using Data;
using interfaces;
using Microsoft.EntityFrameworkCore;
using Model;

namespace Repository
{
    public class RepProdact : Iprodact
    {
        private Context _context;
        private IConfiguration _config;
        public RepProdact(Context context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        public async Task<int> CreateNewProdact(Prodact newPordact)
        {
            if (await _context.prodacts.AnyAsync(e => e.pordactName == newPordact.pordactName))
                return -1;
            _context.Add(newPordact);
            await Save();
            return newPordact.prodactId;
        }

        public Task DeleteProdact(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<ICollection<Prodact>> GetAllProdact()
        {
            return await _context.prodacts.Where(e => e.IsActive).ToListAsync();
        }

        public async Task<Prodact> GetPordact(int id)
        {
            return await _context.prodacts.Where(e => e.prodactId == id && e.IsActive).FirstOrDefaultAsync() ?? throw new ArgumentNullException();
        }

        public async Task<Prodact> UpdateProdact(Prodact UpdatePordact)
        {
            var prodact = await GetPordact(UpdatePordact.prodactId);
            prodact.typeSize = UpdatePordact.typeSize;
           return await Save()? prodact:throw new Exception();
        }
        public async Task<bool> DeleteProdact(Prodact DeleteProdact)
        {
            DeleteProdact.IsActive = false;
            if (!await _context.prodacts.AnyAsync(e => e.prodactId == DeleteProdact.prodactId))
                throw new ArgumentNullException();
            _context.Update(DeleteProdact);
            return await Save();
        }
        public async Task<string> UploadToAzure(IFormFile file)
        {
            BlobContainerClient blobContainerClient = new BlobContainerClient(_config.GetConnectionString("AzureStorgeConnection"), "oldersystem");
            var filename = $@"{DateTime.Now.Ticks}.png";
            using (var stream = new MemoryStream())
            {
                await file.CopyToAsync(stream);
                stream.Position = 0;
                var answer = await blobContainerClient.UploadBlobAsync($"prodacts/{filename}", stream);
            }
                return blobContainerClient.Uri.ToString()+$"/prodacts/{filename}";
        }
        public async Task<Prodact> UpdateImage(int prodactId, IFormFile image)
        {
            var Prodact = await GetPordact(prodactId);
            Prodact.prodactImage = await UploadToAzure(image);
            return await Save()?Prodact:throw new Exception();
        }
        public async Task<bool> Save()
        {
            return await _context.SaveChangesAsync() > 0 ? true : false;
        }

    }
}