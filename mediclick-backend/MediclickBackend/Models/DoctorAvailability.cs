using System;
using System.Collections.Generic;

namespace MediclickBackend.Models;

public partial class DoctorAvailability
{
    public int Id { get; set; }

    public int DoctorId { get; set; }

    public DateTime AvailableDate { get; set; }

    public bool? IsAvailable { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual User Doctor { get; set; } = null!;
}
