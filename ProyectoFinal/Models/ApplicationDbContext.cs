using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ProyectoFinal.Models
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Comic> Comics { get; set; }
        public DbSet<Oferta> Ofertas { get; set; }
        public DbSet<Mensaje> Mensajes { get; set; }
        public DbSet<Subasta> Subastas { get; set; }
        public DbSet<ApplicationUser> ApplicationUser { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
            {
                base.OnModelCreating(builder);

                builder.Entity<Comic>()
                    .HasOne(c => c.UsuarioVendedor)
                    .WithMany() // Si los usuarios no tienen una lista de cómics
                    .HasForeignKey(c => c.VendedorId)
                    .OnDelete(DeleteBehavior.Cascade);
            }

    }
    
}
