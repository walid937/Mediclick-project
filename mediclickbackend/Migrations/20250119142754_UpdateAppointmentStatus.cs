using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace mediclickbackend.Migrations
{
    /// <inheritdoc />
    public partial class UpdateAppointmentStatus : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Status",
                table: "Appointments",
                newName: "status");

            migrationBuilder.RenameColumn(
                name: "Notes",
                table: "Appointments",
                newName: "notes");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                table: "Appointments",
                newName: "updated_at");

            migrationBuilder.RenameColumn(
                name: "TimeSlot",
                table: "Appointments",
                newName: "time_slot");

            migrationBuilder.RenameColumn(
                name: "PatientId",
                table: "Appointments",
                newName: "patient_id");

            migrationBuilder.RenameColumn(
                name: "DoctorId",
                table: "Appointments",
                newName: "doctor_id");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "Appointments",
                newName: "created_at");

            migrationBuilder.RenameColumn(
                name: "AppointmentDate",
                table: "Appointments",
                newName: "appointment_date");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "status",
                table: "Appointments",
                newName: "Status");

            migrationBuilder.RenameColumn(
                name: "notes",
                table: "Appointments",
                newName: "Notes");

            migrationBuilder.RenameColumn(
                name: "updated_at",
                table: "Appointments",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "time_slot",
                table: "Appointments",
                newName: "TimeSlot");

            migrationBuilder.RenameColumn(
                name: "patient_id",
                table: "Appointments",
                newName: "PatientId");

            migrationBuilder.RenameColumn(
                name: "doctor_id",
                table: "Appointments",
                newName: "DoctorId");

            migrationBuilder.RenameColumn(
                name: "created_at",
                table: "Appointments",
                newName: "CreatedAt");

            migrationBuilder.RenameColumn(
                name: "appointment_date",
                table: "Appointments",
                newName: "AppointmentDate");
        }
    }
}
