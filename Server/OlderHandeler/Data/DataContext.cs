using Microsoft.EntityFrameworkCore;
using Models;
namespace Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        public DbSet<Orders> orders { get; set; }
        public DbSet<Olderpordact> olderpordacts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Orders>(entity => {
                entity.HasKey(e => e.OlderiD);
                entity.Property(e => e.Title).IsUnicode();
                entity.Property(e => e.Type).IsUnicode();

            });
            modelBuilder.Entity<Olderpordact>(entity =>
            {
                entity.HasKey(e => e.tranctionId).HasName("PRIMARY"); ;
                entity.Property(e => e.Sizes).IsUnicode();

            });
            base.OnModelCreating(modelBuilder);
        }
    }
}
