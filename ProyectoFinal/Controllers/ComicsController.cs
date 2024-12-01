using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProyectoFinal.Models;

namespace ProyectoFinal.Controllers
{
    [Authorize]
    public class ComicsController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public ComicsController(ApplicationDbContext context, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        // GET: Comics
        // GET: Comics
[Authorize]
public async Task<IActionResult> Index()
{
    var comics = await _context.Comics
        .Where(c => !c.Vendido) // Solo mostrar cómics disponibles
        .Include(c => c.UsuarioVendedor) // Incluir información del vendedor
        .ToListAsync();

    return View(comics); // Devuelve la lista de cómics para todos
}


        // GET: Comics/Create
        public IActionResult Create()
        {
            if (!User.Identity.IsAuthenticated)
            {
                return RedirectToAction("Login", "Account");
            }

            return View();
        }

        // POST: Comics/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Nombre,RutaImagen")] Comic comic)
        {
            if (!User.Identity.IsAuthenticated)
            {
                return RedirectToAction("Login", "Account");
            }

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); // Obtiene el ID del usuario autenticado
            if (string.IsNullOrEmpty(userId))
            {
                return RedirectToAction("Login", "Account");
            }

            if (ModelState.IsValid)
            {
                // Asigna el ID del vendedor y el usuario vendedor
                comic.VendedorId = userId;
                comic.UsuarioVendedor = await _context.Users.FindAsync(userId);
                comic.Vendido = false;

                try
                {
                    _context.Comics.Add(comic); // Agrega el cómic a la base de datos
                    await _context.SaveChangesAsync();
                    return RedirectToAction(nameof(Index)); // Redirige a la lista de cómics
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error al guardar el cómic: {ex.Message}");
                    ModelState.AddModelError("", "Ocurrió un error al guardar el cómic. Inténtalo de nuevo.");
                }
            }

            return View(comic); // Devuelve la vista en caso de error
        }


                // GET: Comics/Details/5
                public async Task<IActionResult> Details(int? id)
                {
                    if (id == null)
                    {
                        return NotFound();
                    }

                    var comic = await _context.Comics
                        .Include(c => c.UsuarioVendedor)
                        .FirstOrDefaultAsync(m => m.Id == id);

                    if (comic == null)
                    {
                        return NotFound();
                    }

                    return View(comic);
                }

                // GET: Comics/Edit/5
                public async Task<IActionResult> Edit(int? id)
                {
                    if (!User.Identity.IsAuthenticated)
                    {
                        return RedirectToAction("Login", "Account");
                    }

                    var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                    if (string.IsNullOrEmpty(userId))
                    {
                        return RedirectToAction("Login", "Account");
                    }

                    if (id == null)
                    {
                        return NotFound();
                    }

                    var comic = await _context.Comics.FindAsync(id);
                    if (comic == null)
                    {
                        return NotFound();
                    }

                    if (comic.VendedorId != userId)
                    {
                        return Unauthorized("No tienes permiso para editar este cómic.");
                    }

                    return View(comic);
                }

                // POST: Comics/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Nombre,RutaImagen")] Comic comic)
        {
            if (id != comic.Id)
            {
                return NotFound();
            }

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
                return RedirectToAction("Login", "Account");
            }

            if (ModelState.IsValid)
            {
                try
                {
                    comic.VendedorId = userId;
                    _context.Update(comic);
                    await _context.SaveChangesAsync();
                    return RedirectToAction(nameof(Index));
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ComicExists(comic.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
            }

            return View(comic);
        }

        // POST: Comics/Delete/5 ditgamos que si lo hizo bien 
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var comic = await _context.Comics.FindAsync(id);
            if (comic != null)
            {
                _context.Comics.Remove(comic);
                await _context.SaveChangesAsync();
            }

            return RedirectToAction(nameof(Index));
        }

        private bool ComicExists(int id)
        {
            return _context.Comics.Any(e => e.Id == id);
        }

    }
}
