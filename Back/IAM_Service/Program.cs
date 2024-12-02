using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using IrisAPI.CRUD.AdminCRUD;
using IrisAPI.CRUD.UserCRUD;
using IrisAPI.DbContexts;
using IrisAPI.CRUD.SuperAdminCRUD;
using IrisAPI.CRUD.OTPCRUD;
using IrisAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddScoped<IAdminCRUD, AdminCRUD>();
builder.Services.AddScoped<IUserCRUD, UserCRUD>();
builder.Services.AddScoped<ISuperAdminCRUD, SuperAdminCRUD>();
builder.Services.AddScoped<IOTPCRUD, OTPCRUD>();
builder.Services.AddTransient<IEmailService, EmailService>();
builder.Services.AddDbContext<IAMDbContext>(option => {
    option.UseNpgsql(builder.Configuration["ConnectionStrings:IrisContext"]);
});
builder.Services.AddAuthentication("Bearer")
    .AddJwtBearer(option =>
    {
        option.TokenValidationParameters = new()
        {
            ValidateIssuer = true,
            ValidateIssuerSigningKey = true,
            ValidateAudience = true,
            ValidIssuer = builder.Configuration["Authentication:Issuer"],
            ValidAudience = builder.Configuration["Authentication:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(builder.Configuration["Authentication:SecretKey"]))
        };
    });
var app = builder.Build();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
 
app.UseHttpsRedirection();
app.UseRouting();
app.UseCors("AllowAllOrigins");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Urls.Add("http://0.0.0.0:5187");
app.Run();