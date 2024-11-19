namespace ProyectoFinal.Models;
    public class Subasta
    {
        public int Id { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFin { get; set; }
        public DateTime FechaAnuncio { get; set; }
        public int Vendedor { get; set; }
        public bool Completada { get; set; }
        public decimal OfertaMaxima { get; set; }
        public decimal OfertaInicial { get; set; }
        public DateTime HoraUltimaOferta { get; set; }
    }