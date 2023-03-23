using Microsoft.EntityFrameworkCore;
using Model;
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
        public DbSet<Prodact> prodacts { get; set; } = null!;
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Category> category { get; set; } = null!;
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Orders>(entity => {
                entity.HasKey(e => e.OlderiD);
                entity.Property(e => e.Title).IsUnicode();
                entity.Property(e => e.Type).IsUnicode();

            });
            modelBuilder.Entity<Prodact>(entity =>
            {
                entity.ToTable("prodacts");
                entity.HasKey(e => e.prodactId)
                .HasName("PRIMARY");
                entity.Property(e => e.pordactName).IsUnicode();
                entity.Property(e => e.prodactImage).IsUnicode();
            });
            modelBuilder.Entity<Olderpordact>(entity =>
            {
                entity.HasKey(e => e.tranctionId).HasName("PRIMARY"); ;
                entity.Property(e => e.Sizes).IsUnicode();

            });
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.UserId).HasName("PRIMARY"); ;
                entity.Property(e => e.fullName).IsUnicode();
                entity.Property(e => e.ID).IsUnicode();
                entity.Property(e => e.Email).IsUnicode();
                entity.Property(e => e.phoneNumber).IsUnicode();
            });
            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasKey(e => e.categoryId).HasName("PRIMARY");
                entity.Property(e => e.categoryImage).IsUnicode();
                entity.Property(e => e.categoryName).IsUnicode();
            });

            modelBuilder.Entity<Olderpordact>()
                .HasOne(p => p.Older)
                .WithMany(pc => pc.Olders)
                .HasForeignKey(p => p.OlderId);
            modelBuilder.Entity<Olderpordact>()
                .HasOne(p => p.Prodact)
                .WithMany(pc => pc.Prodacts)
                .HasForeignKey(p => p.PordactId);

            base.OnModelCreating(modelBuilder);
        }
    }
}
