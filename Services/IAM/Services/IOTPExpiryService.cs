namespace IrisAPI.Services
{
    public interface IOTPExpiryService
    {
        Task CleanExpiredOTP(string email);
    }
}
