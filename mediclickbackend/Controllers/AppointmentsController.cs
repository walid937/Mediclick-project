
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using mediclickbackend.Data;  // Ensure your Data namespace is included
using mediclickbackend.Models; // Ensure your Models namespace is included

// Define the base route for the controller
[Route("api/appointments")]
[ApiController]  // Use ApiController attribute for automatic model validation
public class AppointmentsController : ControllerBase
{
    private readonly ApplicationDbContext _context; // Define the type of _context

    // Constructor to inject ApplicationDbContext
    public AppointmentsController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: /api/appointments
    [HttpGet]
    public ActionResult Index()
    {
        var appointments = _context.Appointments.ToList();
        return Ok(appointments); // Use Ok for JSON responses
    }

    // POST: /api/appointments/create
    [HttpPost("create")]
    public ActionResult Create(Appointment appointment)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new { success = false, message = "Invalid data." });
        }

        try
        {
            appointment.CreatedAt = DateTime.Now;
            appointment.UpdatedAt = DateTime.Now;
            appointment.Status = appointment.Status ?? "Confirmed";
            _context.Appointments.Add(appointment);
            _context.SaveChanges();
            return Ok(new { success = true, message = "Appointment booked successfully." });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { success = false, message = "An error occurred while booking the appointment.", error = ex.Message });
        }
    }

    // PUT: /api/appointments/update
    [HttpPut("update")]  // Explicitly define the "update" route
    public ActionResult Update(Appointment appointment)
    {
        var existingAppointment = _context.Appointments.Find(appointment.Id);
        if (existingAppointment != null)
        {
            existingAppointment.AppointmentDate = appointment.AppointmentDate;
            existingAppointment.Status = appointment.Status;
            existingAppointment.Notes = appointment.Notes;
            existingAppointment.TimeSlot = appointment.TimeSlot;
            existingAppointment.UpdatedAt = DateTime.Now;
            _context.SaveChanges();
            return Ok(new { success = true, message = "Appointment updated successfully." });
        }

        return Ok(new { success = false, message = "Appointment not found." });
    }

    // DELETE: /api/appointments/delete
    [HttpDelete("delete")]  // Explicitly define the "delete" route
    public ActionResult Delete(int id)
    {
        var appointment = _context.Appointments.Find(id);
        if (appointment != null)
        {
            _context.Appointments.Remove(appointment);
            _context.SaveChanges();
            return Ok(new { success = true, message = "Appointment cancelled successfully." });
        }

        return Ok(new { success = false, message = "Appointment not found." });
    }
}