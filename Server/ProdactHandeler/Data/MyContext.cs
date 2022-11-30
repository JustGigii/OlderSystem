using Microsoft.EntityFrameworkCore;
using Model;
namespace Data
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options) :base(options)
        {

        }

        public DbSet<Prodact> prodacts { get; set; } = null!;


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Prodact>(entity =>
            {
                entity.ToTable("prodacts");
                entity.HasKey(e => e.prodactId)
                .HasName("PRIMARY");
            });
            base.OnModelCreating(modelBuilder);
        }
    }
}
