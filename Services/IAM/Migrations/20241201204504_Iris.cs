using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IrisAPI.Migrations
{
    /// <inheritdoc />
    public partial class Iris : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_SuperAdmins_Email",
                table: "SuperAdmins",
                column: "Email",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_SuperAdmins_Email",
                table: "SuperAdmins");
        }
    }
}
