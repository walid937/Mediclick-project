using System;
using System.Collections.Generic;

namespace MediclickBackend.Models;

public partial class Payment
{
    public int Id { get; set; }

    public int AppointmentId { get; set; }

    public decimal Amount { get; set; }

    public DateTime? PaymentDate { get; set; }

    public string PaymentStatus { get; set; } = null!;

    public virtual Appointment Appointment { get; set; } = null!;
}
