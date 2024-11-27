namespace ProyectoFinal.Models;   
    public class Mensaje
    {
        public int Id { get; set; }
        public string Emisor { get; set; } = string.Empty;
        public string Remitente { get; set; } = string.Empty;
        public DateTime FechaEmision { get; set; }
        public bool Visto { get; set; }
    }
