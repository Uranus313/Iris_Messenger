using IrisAPI.DbContexts;
using IrisAPI.Models;
using IrisAPI.Services;
using Microsoft.EntityFrameworkCore;

namespace IrisAPI.CRUD.OTPCRUD
{
    public class OTPCRUD(IAMDbContext context, IEmailService emailService) : IOTPCRUD
    {
        private readonly IAMDbContext _context = context ?? throw new ArgumentNullException(nameof(context));
        private readonly IEmailService _emailService = emailService ?? throw new ArgumentNullException(nameof(emailService));

        public async Task<bool> ValidateCreditentials(string email, string password)
        {
            var otp = await _context.OTPs.Where(o => o.Email == email && o.ExpirationTime >= DateTime.UtcNow).FirstOrDefaultAsync();

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
        public async Task<bool> CreateOTP(string email)
        {
            var otpCode = GenerateStringOTP(6);
            
            var hashedOtp = BCrypt.Net.BCrypt.HashPassword(otpCode);

            var expirationTime = DateTime.UtcNow.AddMinutes(5);

            var oldOtps = _context.OTPs.Where(o => o.Email == email);
            _context.OTPs.RemoveRange(oldOtps);

            var otp = new OTP
            {
                Email = email,
                Password = hashedOtp,
                ExpirationTime = expirationTime
            };

            _context.OTPs.Add(otp);
            await _context.SaveChangesAsync();

            var isEmailSent = await _emailService.SendEmailAsync(email, "Your OTP Code", $"Your OTP is: {otpCode}");

            return isEmailSent;
        }
    }
}
