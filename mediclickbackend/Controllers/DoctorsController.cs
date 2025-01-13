using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using mediclickbackend.Data;
using mediclickbackend.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mediclickbackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/user/doctors
        [HttpGet("doctors")]
        public async Task<ActionResult<IEnumerable<User>>> GetDoctors(string name, string specialty)
        {
            var query = _context.Users.AsQueryable();

            if (!string.IsNullOrEmpty(name))
            {
                query = query.Where(u => u.Name.Contains(name));
            }

            if (!string.IsNullOrEmpty(specialty))
            {
                query = query.Where(u => u.Specialty.Contains(specialty));
            }

            var doctors = await query.Where(u => u.Role == "Doctor").ToListAsync();
            return Ok(doctors);
        }

        // GET: api/user/doctors/suggestions
        [HttpGet("doctors/suggestions")]
        public async Task<ActionResult<IEnumerable<string>>> GetDoctorSuggestions(string name)
        {
            if (string.IsNullOrEmpty(name))
            {
                return BadRequest("Name parameter is required.");
            }

            var suggestions = await _context.Users
                .Where(u => u.Role == "Doctor" && u.Name.Contains(name))
                .Select(u => u.Name)
                .Distinct()
                .Take(10)
                .ToListAsync();

            return Ok(suggestions);
        }
    }
}
