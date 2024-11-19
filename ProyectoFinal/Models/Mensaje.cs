namespace ProyectoFinal.Models;   
    public class Mensaje
    {
        public int Id { get; set; }
        public int Emisor { get; set; }
        public int Remitente { get; set; }
        public DateTime FechaEmision { get; set; }
        public bool Visto { get; set; }
    }
