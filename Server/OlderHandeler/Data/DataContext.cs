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
        public DbSet<Olderpordact> olderpordact { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Orders>(entity => {
                entity.HasKey(e => e.OlderiD);
                entity.Property(e => e.Title).UseCollation("Hebrew_BIN");
                entity.Property(e => e.Type).UseCollation("Hebrew_BIN");
            });
            modelBuilder.Entity<Olderpordact>(entity =>
            {
                entity.HasKey(e => new { e.PordactId, e.OlderId });
                entity.Property(e => e.Sizes).UseCollation("Hebrew_BIN");
            });
            base.OnModelCreating(modelBuilder);
        }
    }
}
//Hebrew_100_CI_AI_SC_UTF8