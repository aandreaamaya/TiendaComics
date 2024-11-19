namespace ProyectoFinal.ViewModels
{
    public class RegistroUsuarioViewModel
    {
        public string Nombre { get; set; } = null!;

        public string Username { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string Password { get; set; } = null!;

        public string ConfirmPassword { get; set; } = null!;

        // Propiedad para el rol seleccionado
        public string RolSeleccionado { get; set; } = null!;
    }
}
