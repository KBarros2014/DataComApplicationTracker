using AutoMapper;
using DataComApplicationTracker.Server.Dtos;

using DataComApplicationTracker.Server.Models;
using DataComApplicationTracker.Server.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DataComApplicationTracker.Server.Services
{
    public class ApplicationService : IApplicationService
    {
        private readonly IApplicationRepository _repository;
        private readonly IMapper _mapper;

        public ApplicationService(IApplicationRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ApplicationDto>> GetAllApplicationsAsync()
        {
            var applications = await _repository.GetAllAsync();
            return _mapper.Map<IEnumerable<ApplicationDto>>(applications);
        }

        public async Task<ApplicationDto> GetApplicationByIdAsync(int id)
        {
            var application = await _repository.GetByIdAsync(id);
            return _mapper.Map<ApplicationDto>(application);
        }

        public async Task<ApplicationDto> CreateApplicationAsync(ApplicationDto applicationDto)
        {
            var application = _mapper.Map<Application>(applicationDto);
            var result = await _repository.CreateAsync(application);
            return _mapper.Map<ApplicationDto>(result);
        }

        public async Task UpdateApplicationAsync(int id, ApplicationDto applicationDto)
        {
            if (id != applicationDto.Id)
                throw new System.ArgumentException("ID mismatch");

            var application = _mapper.Map<Application>(applicationDto);
            await _repository.UpdateAsync(application);
        }

        public async Task DeleteApplicationAsync(int id)
        {
            await _repository.DeleteAsync(id);
        }

        public async Task<IEnumerable<ApplicationDto>> GetApplicationsByStatusAsync(ApplicationStatus status)
        {
            var applications = await _repository.GetAllAsync();
            var filteredApplications = applications.Where(a => a.Status.Equals(status));
            return _mapper.Map<IEnumerable<ApplicationDto>>(filteredApplications);
        }
    }
}