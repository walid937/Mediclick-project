// DoctorController.cs

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using mediclickbackend.Models;
using mediclickbackend.Data;
using System.Linq;

namespace mediclickbackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DoctorController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/doctor
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetDoctors()
        {
            // Fetch all users with the role 'doctor' from the database
            var doctors = await _context.Users
                                         .Where(u => u.Role == "doctor")
                                         .ToListAsync();

            if (!doctors.Any())
            {
                return NotFound("No doctors found.");
            }

            return Ok(doctors); // Return the list of doctors as JSON
        }
    }
}
