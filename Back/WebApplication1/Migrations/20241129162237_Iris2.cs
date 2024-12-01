using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IrisAPI.Migrations
{
    /// <inheritdoc />
    public partial class Iris2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TwoStepPassword",
                table: "Users",
                type: "character varying(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TwoStepPassword",
                table: "Admins",
                type: "character varying(50)",
                maxLength: 50,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TwoStepPassword",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "TwoStepPassword",
                table: "Admins");
        }
    }
}
