using DataComApplicationTracker.Server.Data;
using DataComApplicationTracker.Server.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DataComApplicationTracker.Server.Repositories
{
    public class ApplicationRepository : IApplicationRepository
    {
        private readonly DataComApplicationTrackerServerContext _context;

        public ApplicationRepository(DataComApplicationTrackerServerContext context)
        {
            _context = context;
        }

        public async Task<List<Application>> GetAllAsync()
        {
            return await _context.Applications.ToListAsync();
        }

        public async Task<Application> GetByIdAsync(int id)
        {
            return await _context.Applications.FindAsync(id);
        }

        public async Task<Application> CreateAsync(Application application)
        {
            _context.Applications.Add(application);
            await _context.SaveChangesAsync();
            return application;
        }

        public async Task UpdateAsync(Application application)
        {
            _context.Entry(application).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var application = await _context.Applications.FindAsync(id);
            if (application == null)
                return false;

            _context.Applications.Remove(application);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ExistsAsync(int id)
        {
            return await _context.Applications.AnyAsync(e => e.ID == id);
        }
    }
}