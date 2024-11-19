namespace ProyectoFinal.Models
{
    public class Comic
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = null!;
        public string RutaImagen { get; set; } = null!;
        public string VendedorId { get; set; } = null!; // Relación con ApplicationUser
        public ApplicationUser UsuarioVendedor { get; set; } = null!;
    }
}
