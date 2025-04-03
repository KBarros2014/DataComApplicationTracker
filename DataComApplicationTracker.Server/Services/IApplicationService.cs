using DataComApplicationTracker.Server.Dtos;
using DataComApplicationTracker.Server.Models;

namespace DataComApplicationTracker.Server.Services
{
    public interface IApplicationService
    {

        Task<IEnumerable<ApplicationDto>> GetAllApplicationsAsync();
        Task<ApplicationDto> GetApplicationByIdAsync(int id);
        Task<ApplicationDto> CreateApplicationAsync(ApplicationDto applicationDto);
        Task UpdateApplicationAsync(int id, ApplicationDto applicationDto);
        Task DeleteApplicationAsync(int id);
        Task<IEnumerable<ApplicationDto>> GetApplicationsByStatusAsync(ApplicationStatus status);
       
    }
}
