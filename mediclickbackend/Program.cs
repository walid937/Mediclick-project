
using mediclickbackend.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers(); // API controllers

// Configure Entity Framework Core with SQL Server
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Configure JWT-based Authentication (optional, if JWT is used)
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = builder.Configuration["Jwt:Issuer"]; // Specify your JWT issuer
        options.Audience = builder.Configuration["Jwt:Audience"]; // Specify your JWT audience
        options.RequireHttpsMetadata = !builder.Environment.IsDevelopment(); // Enable HTTPS in production
    });

// Configure Authorization
builder.Services.AddAuthorization();

// Configure CORS for cross-origin requests from the React frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173") // Replace with your frontend's URL
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials(); // Allow credentials if required
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts(); // Enable HSTS for production
}
else
{
    app.UseDeveloperExceptionPage(); // Enable developer exception page in development
}

// Middleware to enforce HTTPS
app.UseHttpsRedirection();

// Serve static files
app.UseStaticFiles();

// Enable request routing
app.UseRouting();

// Enable CORS with the configured policy
app.UseCors("AllowReactFrontend");

// Enable Authentication and Authorization (if JWT is used)
app.UseAuthentication();
app.UseAuthorization();

// Map API controllers
app.MapControllers();

// Optional: Add MVC route mapping for mixed use (if you also serve Razor Pages or MVC views)
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

// Run the application
app.Run();