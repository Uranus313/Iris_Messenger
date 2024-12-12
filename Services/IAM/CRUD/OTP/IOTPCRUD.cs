namespace IrisAPI.CRUD.OTPCRUD
{
    public interface IOTPCRUD
    {
        Task<bool> ValidateCreditentials(string email, string password);
        Task CreateOTP(string email);
    }
}
