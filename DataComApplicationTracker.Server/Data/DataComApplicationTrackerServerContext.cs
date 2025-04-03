using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DataComApplicationTracker.Server.Models;
using Microsoft.AspNetCore.Builder;

namespace DataComApplicationTracker.Server.Data
{
    public class DataComApplicationTrackerServerContext : DbContext
    {
        public DataComApplicationTrackerServerContext (DbContextOptions<DataComApplicationTrackerServerContext> options)
            : base(options)
        {
        }

        public DbSet<DataComApplicationTracker.Server.Models.Application> Applications { get; set; } = default!;
    }
}
