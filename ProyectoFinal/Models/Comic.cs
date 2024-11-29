namespace ProyectoFinal.Models
{
    public class Comic
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = null!;
        public string RutaImagen { get; set; } = null!;
        public string VendedorId { get; set; } = string.Empty;

        public bool Vendido { get; set; } = false;
        public ApplicationUser? UsuarioVendedor { get; set; } 
        
    }
}
