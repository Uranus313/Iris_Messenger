using IrisAPI.DbContexts;
using IrisAPI.Models;
using IrisAPI.Services;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace IrisAPI.CRUD.OTPCRUD
{
    public class OTPCRUD(IAMDbContext context, IEmailService emailService, IOTPExpiryService OTPExpiryService) : IOTPCRUD
    {
        private readonly IAMDbContext _context = context ?? throw new ArgumentNullException(nameof(context));
        private readonly IEmailService _emailService = emailService ?? throw new ArgumentNullException(nameof(emailService));
        private readonly IOTPExpiryService _OTPExpirayService = OTPExpiryService ?? throw new ArgumentNullException(nameof(OTPExpiryService));

        public async Task<bool> ValidateCreditentials(string email, string password)
        {
            var otp = await _context.OTPs.Where(o => o.Email == email).FirstOrDefaultAsync();

            if (otp == null || !BCrypt.Net.BCrypt.Verify(password, otp.Password))
            {
                return false;
            }

            return true;
        }

        public string GenerateStringOTP(int length)
        {
            const string characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var random = new Random();
            return new string(Enumerable.Repeat(characters, length)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }

        public async Task CreateOTP(string email)
        {
            var otpCode = GenerateStringOTP(6);
            
            var hashedOtp = BCrypt.Net.BCrypt.HashPassword(otpCode);

            var expirationTime = DateTime.UtcNow.AddMinutes(2);

            var otp = new OTP
            {
                Email = email,
                Password = hashedOtp,
                ExpirationTime = expirationTime
            };

            var validationResults = new List<ValidationResult>();
            var validationContext = new ValidationContext(otp, null, null);

            if (!Validator.TryValidateObject(otp, validationContext, validationResults, true))
            {
                var errors = string.Join(", ", validationResults.Select(vr => vr.ErrorMessage));
                throw new ValidationException($"Model validation failed: {errors}");
            }

            _context.OTPs.Add(otp);
            await _context.SaveChangesAsync();

            await _emailService.SendEmailAsync(email, "Your OTP Code", $"Your OTP is: {otpCode}");
            _ = _OTPExpirayService.CleanExpiredOTP(email);
        }
    }
}
