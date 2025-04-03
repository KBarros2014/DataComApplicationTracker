using DataComApplicationTracker.Server.Models;

namespace DataComApplicationTracker.Server.Dtos
{
    public class ApplicationDto
    {
        public int Id { get; set; }
        public string Position { get; set; }
        public string Company { get; set; }
        public DateTime DateApplied { get; set; }
        public ApplicationStatus Status { get; set; }
        public string JobDescription { get; set; }
       
        public string Location { get; set; }
        public string Notes { get; set; }
    }
}
