namespace ProyectoFinal.Models
{
    public class Mensaje
    {
        public int Id { get; set; }
        public string Emisor { get; set; } = string.Empty; // ID del remitente
        public string Remitente { get; set; } = string.Empty; // ID del receptor
        public string Contenido { get; set; } = string.Empty; // Contenido del mensaje
        public DateTime FechaEnvio { get; set; } // Fecha y hora de envío
        public bool Visto { get; set; } = false; // Estado de lectura
    }
}
