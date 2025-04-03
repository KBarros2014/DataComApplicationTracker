import { Component, OnInit } from '@angular/core';
import { Application, ApplicationService } from '../../services/application.service';

@Component({
  selector: 'app-applications-list',
  templateUrl: './applications-list.component.html',
  styleUrls: ['./applications-list.component.css'],
  standalone: false  // Explicitly set to false
})
export class ApplicationsListComponent implements OnInit {
  applications: Application[] = [];
  loading = true;
  error: string | null = null;

  constructor(private applicationService: ApplicationService) { }

  ngOnInit(): void {
    this.fetchApplications();
  }

  fetchApplications(): void {
    this.loading = true;
    this.error = null;
    console.log('Fetching applications...');

    this.applicationService.getApplications().subscribe({
      next: (data: Application[]) => {
        console.log('Applications data received:', data);
        this.applications = data;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error fetching applications:', err);
        this.error = `Failed to load applications: ${err.message}`;
        this.loading = false;
      }
    });
  }

  updateStatus(application: Application): void {
    this.applicationService.updateApplication(application.id, { status: application.status }).subscribe({
      next: () => console.log(`Status updated for application ${application.id}`),
      error: (err: any) => console.error('Error updating status:', err)
    });
  }
}
