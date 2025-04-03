import { Component, OnInit } from '@angular/core';
import { Application, ApplicationService, ApplicationStatus } from '../../services/application.service';
import { CommonModule, DatePipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-applications-list',
  templateUrl: './applications-list.component.html',
  styleUrls: ['./applications-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    DatePipe
  ]
})
export class ApplicationsListComponent implements OnInit {
  applications: Application[] = [];
  loading = false;
  error: string | null = null;

  constructor(private applicationService: ApplicationService) { }

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications(): void {
    this.loading = true;
    this.applicationService.getApplications().subscribe({
      next: (data) => {
        this.applications = data;
        console.log(data)
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading applications:', err);
        this.error = 'Failed to load applications. Please try again later.';
        this.loading = false;
      }
    });
  }

  getStatusLabel(status: ApplicationStatus): string {
    switch (status) {
      case ApplicationStatus.Applied:
        return 'Applied';
      case ApplicationStatus.InReview:
        return 'In Review';
      case ApplicationStatus.Interview:
        return 'Interview';
      case ApplicationStatus.Rejected:
        return 'Rejected';
      case ApplicationStatus.Accepted:
        return 'Accepted';
      default:
        return 'Unknown';
    }
  }

  deleteApplication(id: number): void {
    if (confirm('Are you sure you want to delete this application?')) {
      this.applicationService.deleteApplication(id).subscribe({
        next: () => {
          this.loadApplications(); // Reload the list
        },
        error: (err) => {
          console.error('Error deleting application:', err);
          this.error = 'Failed to delete application. Please try again later.';
        }
      });
    }
  }
}
