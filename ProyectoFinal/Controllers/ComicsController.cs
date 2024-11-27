using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using ProyectoFinal.Models;


namespace ProyectoFinal.Controllers
{
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
        [Authorize]
        public async Task<IActionResult> Index()
        {
            if (User.Identity != null && User.Identity.IsAuthenticated)
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                var user = await _userManager.FindByIdAsync(userId);
                var roles = await _userManager.GetRolesAsync(user);


                if (roles.Contains("Cliente"))
                {
                    // Los compradores pueden ver todos los comics en la tienda
                    var comics = await _context.Comics
                    .Where(c => c.Vendido == false)
                    .Join(
                        _context.Users,                  
                        comic => comic.VendedorId,       
                        user => user.Id,                 
                        (comic, user) => new             
                        {
                            Comic = comic,
                            Vendedor = user
                        }
                    )
                    .ToListAsync();
                    var subastas = await _context.Subastas.Where(s => s.FechaAnuncio >= DateTime.Today & s.FechaFin<=DateTime.Now)
                        .Join(
                        _context.Users,
                        subasta => subasta.Vendedor,
                        user => user.Id,
                        (comic, user) => new
                        {
                            Comic = comic,
                            Vendedor = user
                        }).ToListAsync();

                    var viewModel = new 
                    {
                        Comics = comics,
                        Subastas = subastas
                    };
                    return View(viewModel);
                }
                else if (roles.Contains("Vendedor"))
                {
                    // Los vendedores solo pueden ver los comics que han subido
                    return View(await _context.Comics.Where(c => c.VendedorId == userId).ToListAsync());
                }
                // esto es facil de escalar para un admin pues solo hay que agregar su apartado

                else
                {
                    return RedirectToAction("Login", "Account");
                }
                

            }
            else
            {
                return RedirectToAction("Login", "Account");
            }
            
        }

        // GET: Comics/Details/5
        [Authorize]
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var comic = await _context.Comics
                .FirstOrDefaultAsync(m => m.Id == id);
            if (comic == null)
            {
                return NotFound();
            }

            return View(comic);
        }
        //GET: Comics/RegisterAsSeller
        public IActionResult RegisterAsSeller()
        {
            return View();
        }

        // GET: Comics/Create
        [Authorize]
        public async Task<IActionResult> Create()
        {
            if(User.Identity != null && User.Identity.IsAuthenticated)
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                var user = await _userManager.FindByIdAsync(userId);
                var roles = await _userManager.GetRolesAsync(user);
            
                if (roles.Contains("Vendedor"))
                {
                    
                    return View();
                }

                else
                {
                    RegisterAsSeller();
                    return Ok();
                }


            }
            else
            {
                return RedirectToAction("Login", "Account");
            }

        }

        // POST: Comics/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Nombre,RutaImagen,VendedorId")] Comic comic)
        {
            if (ModelState.IsValid)
            {
                _context.Add(comic);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(comic);
        }

        // GET: Comics/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (User.Identity != null && User.Identity.IsAuthenticated)
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                var user = await _userManager.FindByIdAsync(userId);
                var roles = await _userManager.GetRolesAsync(user);

                if (roles.Contains("Vendedor"))
                {
                    if (id == null)
                    {
                        return NotFound();
                    }

                    var comic = await _context.Comics.FindAsync(id);
                    if (comic == null)
                    {
                        return NotFound();
                    }
                    return View(comic);
                }
                // esto es facil de escalar para un admin pues solo hay que agregar su apartado

                else
                {
                    RegisterAsSeller();
                    return Ok();
                }
            }
            else
            {
                return RedirectToAction("Login", "Account");
            }
        }

        // POST: Comics/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Nombre,RutaImagen,VendedorId")] Comic comic)
        {
            if (id != comic.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(comic);
                    await _context.SaveChangesAsync();
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
                return RedirectToAction(nameof(Index));
            }
            return View(comic);
        }

        // GET: Comics/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (User.Identity != null && User.Identity.IsAuthenticated)
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                var user = await _userManager.FindByIdAsync(userId);
                var roles = await _userManager.GetRolesAsync(user);

                if (roles.Contains("Vendedor"))
                {
                    if (id == null)
                    {
                        return NotFound();
                    }

                    var comic = await _context.Comics
                        .FirstOrDefaultAsync(m => m.Id == id);
                    if (comic == null)
                    {
                        return NotFound();
                    }

                    return View(comic);
                }
                // esto es facil de escalar para un admin pues solo hay que agregar su apartado

                else
                {
                    RegisterAsSeller();
                    return Ok();
                }
            }
            else
            {
                return RedirectToAction("Login", "Account");
            }
            
        }

        // POST: Comics/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var comic = await _context.Comics.FindAsync(id);
            if (comic != null)
            {
                _context.Comics.Remove(comic);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool ComicExists(int id)
        {
            return _context.Comics.Any(e => e.Id == id);
        }
    }
}
