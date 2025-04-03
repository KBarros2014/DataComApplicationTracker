namespace DataComApplicationTracker.Server.Models
{
    public class Application
    {
        public  int ID { get; set; }

        public string Position { get; set; }
        public string JobDescription { get; set; }
        public bool Outcome { get; set; }
        public string Location { get; set; }

        public  DateTimeOffset DateApplied { get; set; }

        public string?  CompanyName { get; set; }
        public ApplicationStatus Status { get; set; }
    }
}
