using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using DataComApplicationTracker.Server.Data;
using DataComApplicationTracker.Server.Repositories;
using DataComApplicationTracker.Server.Services;

namespace DataComApplicationTracker.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddDbContext<DataComApplicationTrackerServerContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("DataComApplicationTrackerServerContext") ?? throw new InvalidOperationException("Connection string 'DataComApplicationTrackerServerContext' not found.")));

            // Add services to the container.
            builder.Services.AddScoped<IApplicationRepository, ApplicationRepository>();
            builder.Services.AddScoped<IApplicationService, ApplicationService>();

            // Add AutoMapper
            builder.Services.AddAutoMapper(typeof(Program).Assembly);

            // Add CORS
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll",
                    builder => builder.AllowAnyOrigin()
                                     .AllowAnyMethod()
                                     .AllowAnyHeader());
            });

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();
            app.UseDefaultFiles();
            app.UseStaticFiles();

         
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            // Use CORS before routing
            app.UseCors("AllowAll");

            app.UseHttpsRedirection();
            app.UseAuthorization();
            app.MapControllers();
            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}