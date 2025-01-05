using MediclickBackend.Models;  // Assuming the missing classes are in the Models namespace
using System.ComponentModel.DataAnnotations;

public partial class User
{
    // Properties
    [Key]
    public int Id { get; set; }

    [Required, MaxLength(100)]
    public string Name { get; set; }

    [Required, EmailAddress, MaxLength(255)]
    public string Email { get; set; }

    [Required, MinLength(6)]
    public string Password { get; set; }

    [Required, MaxLength(50)]
    public string Role { get; set; }

    [MaxLength(100)]
    public string? Specialty { get; set; }

    [MaxLength(50)]
    public string? License { get; set; }

    [Phone, MaxLength(15)]
    public string? PhoneNumber { get; set; }

    public DateTime? DateOfBirth { get; set; }

    [MaxLength(100)]
    public string? Ville { get; set; }

    public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;

    [MaxLength(500)]
    public string? ProfilePhoto { get; set; }

    // Navigation Properties
    public virtual ICollection<Appointment> AppointmentDoctors { get; set; } = new HashSet<Appointment>();
    public virtual ICollection<AppointmentHistory> AppointmentHistories { get; set; } = new HashSet<AppointmentHistory>();
    public virtual ICollection<Appointment> AppointmentPatients { get; set; } = new HashSet<Appointment>();
    public virtual ICollection<DoctorAvailability> DoctorAvailabilities { get; set; } = new HashSet<DoctorAvailability>();
    public virtual ICollection<Notification> Notifications { get; set; } = new HashSet<Notification>();

    // Default Constructor
    public User()
    {
        // Initialize default values for navigation properties
        AppointmentDoctors = new HashSet<Appointment>();
        AppointmentHistories = new HashSet<AppointmentHistory>();
        AppointmentPatients = new HashSet<Appointment>();
        DoctorAvailabilities = new HashSet<DoctorAvailability>();
        Notifications = new HashSet<Notification>();
    }

    // Parameterized Constructor
    public User(
        string name,
        string email,
        string password,
        string role,
        string? specialty = null,
        string? license = null,
        string? phoneNumber = null,
        DateTime? dateOfBirth = null,
        string? ville = null,
        DateTime? createdAt = null,
        DateTime? updatedAt = null,
        string? profilePhoto = null)
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
        CreatedAt = createdAt ?? DateTime.UtcNow;
        UpdatedAt = updatedAt ?? DateTime.UtcNow;
        ProfilePhoto = profilePhoto;

        // Initialize default values for navigation properties
        AppointmentDoctors = new HashSet<Appointment>();
        AppointmentHistories = new HashSet<AppointmentHistory>();
        AppointmentPatients = new HashSet<Appointment>();
        DoctorAvailabilities = new HashSet<DoctorAvailability>();
        Notifications = new HashSet<Notification>();
    }

    // Method to update timestamps
    public void UpdateTimestamps()
    {
        UpdatedAt = DateTime.UtcNow;
    }
}
