using System;
using System.ComponentModel.DataAnnotations.Schema;

public class Appointment
{
    public int Id { get; set; }

    [Column("patient_id")]
    public int PatientId { get; set; }

    [Column("doctor_id")]
    public int DoctorId { get; set; }

    [Column("appointment_date")]
    public DateTime AppointmentDate { get; set; }

    [Column("status")]
    public string Status { get; set; }

    [Column("notes")]
    public string Notes { get; set; }

    [Column("created_at")]
    public DateTime CreatedAt { get; set; }

    [Column("updated_at")]
    public DateTime UpdatedAt { get; set; }

    [Column("time_slot")]
    public string TimeSlot { get; set; }
}
