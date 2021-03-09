using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using OrderDiscountInterfaces;
#nullable disable

namespace OrderDiscountModels
{
    public partial class OrderDiscountDbContext : DbContext, IOrderDiscountDbContext<Discount>
    {
        public OrderDiscountDbContext()
        {
        }

        public OrderDiscountDbContext(DbContextOptions<OrderDiscountDbContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }

        public virtual DbSet<Discount> Discounts { get; set; }

        /* protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
         {
             if (!optionsBuilder.IsConfigured)
             {
 #warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                 optionsBuilder.UseSqlServer("Server=localhost;Database=OrderDiscountDb;Integrated Security=true;");
             }
         }*/

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Discount>(entity =>
            {
                entity.HasKey(e => e.MinimumOrderAmount)
                    .HasName("PK__Discount__F4E54C0C028EBF40");

                entity.ToTable("Discount");

                entity.Property(e => e.MinimumOrderAmount).HasColumnType("decimal(12, 2)");

                entity.Property(e => e.DiscountPercent).HasColumnType("decimal(6, 2)");

                entity.Property(e => e.MinimumPastOrder).HasDefaultValueSql("((0))");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

        void IOrderDiscountDbContext<Discount>.SaveChanges()
        {
            base.SaveChanges();
        }
    }
}
