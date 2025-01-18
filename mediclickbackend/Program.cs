using mediclickbackend.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();  // Use AddControllers for API controllers (not AddControllersWithViews)

// Add Entity Framework Core with SQL Server (change the connection string as needed)
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Configure authentication (you can skip this if not using JWT)
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = builder.Configuration["Jwt:Issuer"]; // Set your JWT issuer here
        options.Audience = builder.Configuration["Jwt:Audience"]; // Set your JWT audience here
        options.RequireHttpsMetadata = false; // Set to true in production
    });

// Add Authorization
builder.Services.AddAuthorization();

// Configure CORS to allow requests from React frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.WithOrigins("http://localhost:5173") // React frontend's URL
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

// Enable CORS
app.UseCors("AllowAll");

// Enable Authentication and Authorization middleware (you can skip if not using JWT)
app.UseAuthentication();
app.UseAuthorization();

// Enable API controllers routing
app.MapControllers();  // This line is necessary to enable API route mapping

// If you want to keep MVC routes (for views), you can still add this part:
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
