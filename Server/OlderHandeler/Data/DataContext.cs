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
           });
            modelBuilder.Entity<Olderpordact>(entity =>
            {
                entity.HasKey(e => new { e.PordactId, e.OlderId });
            });
            base.OnModelCreating(modelBuilder);
        }
    }
}
