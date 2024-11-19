using Microsoft.AspNetCore.Identity;
using ProyectoFinal.Models;

namespace ProyectoFinal.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string Nombre { get; set; } = null!;
    }
}