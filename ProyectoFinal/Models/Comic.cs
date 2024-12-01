namespace ProyectoFinal.Models
{
    public class Comic
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string RutaImagen { get; set; } = string.Empty;
        public string VendedorId { get; set; } = string.Empty;
        public bool Vendido { get; set; } = false;

        // Relación con el vendedor
        public ApplicationUser UsuarioVendedor { get; set; } = null!;
    }
}
