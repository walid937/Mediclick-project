using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using MediclickBackend.Models;

namespace MediclickBackend.Data
{
    public partial class CabinetDbContext : DbContext
    {
        public CabinetDbContext()
        {
        }

        public CabinetDbContext(DbContextOptions<CabinetDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Appointment> Appointments { get; set; }
        public virtual DbSet<AppointmentHistory> AppointmentHistories { get; set; }
        public virtual DbSet<DoctorAvailability> DoctorAvailabilities { get; set; }
        public virtual DbSet<Notification> Notifications { get; set; }
        public virtual DbSet<Payment> Payments { get; set; }
        public virtual DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // The connection string is now loaded from the appsettings.json file
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(Environment.GetEnvironmentVariable("DefaultConnection"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Appointment>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK__appointm__3213E83FF8A1A433");
                entity.ToTable("appointments");

                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.AppointmentDate)
                    .HasColumnType("datetime")
                    .HasColumnName("appointment_date");
                entity.Property(e => e.CreatedAt)
                    .HasDefaultValueSql("(getdate())")
                    .HasColumnType("datetime")
                    .HasColumnName("created_at");
                entity.Property(e => e.DoctorId).HasColumnName("doctor_id");
                entity.Property(e => e.Notes).HasColumnName("notes");
                entity.Property(e => e.PatientId).HasColumnName("patient_id");
                entity.Property(e => e.Status)
                    .HasMaxLength(50)
                    .HasDefaultValueSql("('pending')")
                    .HasColumnName("status");
                entity.Property(e => e.TimeSlot)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("time_slot");
                entity.Property(e => e.UpdatedAt)
                    .HasDefaultValueSql("(getdate())")
                    .HasColumnType("datetime")
                    .HasColumnName("updated_at");

                entity.HasOne(d => d.Doctor).WithMany(p => p.AppointmentDoctors)
                    .HasForeignKey(d => d.DoctorId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__appointme__docto__5165187F");

                entity.HasOne(d => d.Patient).WithMany(p => p.AppointmentPatients)
                    .HasForeignKey(d => d.PatientId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__appointme__patie__5070F446");
            });

            // Define other entities similarly...

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
