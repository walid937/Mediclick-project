using System;
using System.Collections.Generic;

namespace MediclickBackend.Models;


public partial class AppointmentHistory
{
    public int Id { get; set; }

    public int AppointmentId { get; set; }

    public string Status { get; set; } = null!;

    public int UpdatedBy { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual Appointment Appointment { get; set; } = null!;

    public virtual User UpdatedByNavigation { get; set; } = null!;
}
