using Microsoft.AspNetCore.Identity;
using ProyectoFinal.Models;

namespace ProyectoFinal.Models
{
    public class ApplicationRole : IdentityRole
    {
        // Constructor vacío para compatibilidad con Identity
        public ApplicationRole() : base() { }

        // Constructor para inicializar con un nombre
        public ApplicationRole(string roleName) : base(roleName) { }

        // Propiedad adicional (opcional) para descripción del rol
        public string? Descripcion { get; set; }
    }
}
