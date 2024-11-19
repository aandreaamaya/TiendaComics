namespace ProyectoFinal.Models;
    public class Oferta
    {
        public int Id { get; set; }
        public int Emisor { get; set; }
        public int Remitente { get; set; }
        public DateTime FechaEmision { get; set; }
        public string ObjetoTrueque { get; set; } = null!;
        public bool Aceptada { get; set; }
        public bool Visto { get; set; }
    }