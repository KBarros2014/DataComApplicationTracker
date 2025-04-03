using DataComApplicationTracker.Server.Models;

namespace DataComApplicationTracker.Server.Repositories
{
    public interface IApplicationRepository
    {
        Task<List<Application>> GetAllAsync();
        Task<Application> GetByIdAsync(int id);
        Task<Application> CreateAsync(Application application);
        Task UpdateAsync(Application application);
        Task<bool> DeleteAsync(int id);
        Task<bool> ExistsAsync(int id);
    }
}
