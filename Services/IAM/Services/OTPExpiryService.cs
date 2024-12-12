using IrisAPI.DbContexts;
using Microsoft.EntityFrameworkCore;

namespace IrisAPI.Services
{
    public class OTPExpiryService(IServiceScopeFactory scopeFactory) : IOTPExpiryService
    {
        private readonly IServiceScopeFactory _scopeFactory = scopeFactory ?? throw new ArgumentNullException(nameof(scopeFactory));

        public Task CleanExpiredOTP(string email)
        {
            return Task.Run(async () =>
            {
                await Task.Delay(TimeSpan.FromMinutes(2));

                using var scope = _scopeFactory.CreateScope();
                var context = scope.ServiceProvider.GetRequiredService<IAMDbContext>();

                var existingOtp = await context.OTPs
                    .FirstOrDefaultAsync(o => o.Email == email && o.ExpirationTime <= DateTime.UtcNow);

                if (existingOtp != null)
                {
                    context.OTPs.Remove(existingOtp);
                    await context.SaveChangesAsync();
                }
            });
        }
    }
}
