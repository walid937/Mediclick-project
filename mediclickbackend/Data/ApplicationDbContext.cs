using Microsoft.EntityFrameworkCore;
using mediclickbackend.Models;
using System.Collections.Generic;
using System.Numerics;

namespace mediclickbackend.Data
{
    public class ApplicationDbContext : DbContext
    {
        // Constructor to inject DbContext options
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // DbSet for the User model
        public DbSet<User> Users { get; set; }

        public DbSet<Appointment> Appointments { get; set; }



        // Override OnModelCreating to configure the models
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure the User entity
            modelBuilder.Entity<User>(entity =>
            {
                // Ensure that the email is unique
                entity.HasIndex(u => u.Email).IsUnique();

                // Configure the created_at and updated_at columns
                entity.Property(u => u.CreatedAt)
                    .HasDefaultValueSql("GETDATE()")
                    .ValueGeneratedOnAdd();

                entity.Property(u => u.UpdatedAt)
                    .HasDefaultValueSql("GETDATE()")
                    .ValueGeneratedOnAddOrUpdate();
            });

            // Configure the Doctor entity
            modelBuilder.Entity<Doctor>(entity =>
            {
                // Ensure that the Name and Specialty fields are required
                entity.Property(d => d.Name)
                    .IsRequired()
                    .HasMaxLength(100); // Set a maximum length for the name

                entity.Property(d => d.Specialty)
                    .IsRequired()
                    .HasMaxLength(100); // Set a maximum length for the specialty

                // Optional: Configure other fields like Fee
                entity.Property(d => d.Fee)
                    .HasColumnType("decimal(18,2)"); // Set the precision for the Fee column
            });

            // Add other model configurations as necessary
        }
    }
}
