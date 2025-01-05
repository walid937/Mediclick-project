using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MediclickBackend.Data;
using MediclickBackend.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BCrypt.Net;

namespace MediclickBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly CabinetDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(CabinetDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // Login endpoint
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel login)
        {
            if (login == null || string.IsNullOrWhiteSpace(login.Email) || string.IsNullOrWhiteSpace(login.Password))
                return BadRequest("Email and Password are required.");

            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == login.Email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(login.Password, user.Password))
                return Unauthorized("Invalid credentials");

            var token = GenerateJwtToken(user);

            return Ok(new { Token = token });
        }

        // Signup endpoint
        [HttpPost("signup")]
        public async Task<IActionResult> Signup([FromBody] SignupModel signup)
        {
            if (signup == null || string.IsNullOrWhiteSpace(signup.Email) || string.IsNullOrWhiteSpace(signup.Password))
                return BadRequest("All fields are required.");

            var existingUser = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == signup.Email);

            if (existingUser != null)
                return BadRequest("Email is already in use.");

            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(signup.Password);

            var user = new MediclickBackend.Models.User
            (
                signup.Name,
                signup.Email,
                hashedPassword,
                signup.Role,
                signup.Specialty,
                signup.License,
                signup.PhoneNumber,
                signup.DateOfBirth,
                signup.Ville
            );

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var token = GenerateJwtToken(user);

            return Ok(new { Token = token, Message = "Signup successful" });
        }

        private string GenerateJwtToken(MediclickBackend.Models.User user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role),
                new Claim("UserId", user.Id.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }

    public class LoginModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class SignupModel
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string Specialty { get; set; }
        public string License { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Ville { get; set; }
    }

    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string Specialty { get; set; }
        public string License { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Ville { get; set; }

        public User(string name, string email, string password, string role, string specialty, string license, string phoneNumber, DateTime dateOfBirth, string ville)
        {
            Name = name;
            Email = email;
            Password = password;
            Role = role;
            Specialty = specialty;
            License = license;
            PhoneNumber = phoneNumber;
            DateOfBirth = dateOfBirth;
            Ville = ville;
        }
    }
}
