import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Application, ApplicationService, ApplicationStatus } from '../../services/application.service';
import { DatePipe, CommonModule } from '@angular/common';

// Material Imports for forms
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

// Date adapter import
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-edit-application',
  templateUrl: './edit-application.component.html',
  styleUrls: ['./edit-application.component.css'],
  standalone: true,
  providers: [
    DatePipe,
    provideNativeDateAdapter() 
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatIconModule
  ]
})
export class EditApplicationComponent implements OnInit {
  applicationForm: FormGroup;
  applicationId: number | null = null;
  loading = false;
  error: string | null = null;

  // Updated status options to match backend enum
  statusOptions = [
    { value: ApplicationStatus.Applied, label: 'Applied' },
    { value: ApplicationStatus.InReview, label: 'In Review' },
    { value: ApplicationStatus.Interview, label: 'Interview' },
    { value: ApplicationStatus.Rejected, label: 'Rejected' },
    { value: ApplicationStatus.Accepted, label: 'Accepted' }
  ];

  constructor(
    private fb: FormBuilder,
    private applicationService: ApplicationService,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {
    this.applicationForm = this.fb.group({
      companyName: ['', Validators.required],
      position: ['', Validators.required],
      jobDescription: [''],
      location: [''],
      outcome: [false],
      status: [ApplicationStatus.Applied, Validators.required],
      dateApplied: [new Date(), Validators.required]
    });
  }

  ngOnInit(): void {
    // Get the ID parameter from the route
    const idParam = this.route.snapshot.paramMap.get('id');

    // Check if idParam exists and is a valid number
    if (idParam && !isNaN(+idParam) && +idParam > 0) {
      this.applicationId = +idParam; 
      this.loadApplication(this.applicationId);
    } else {
      // If ID is missing or invalid, redirect to the applications list
      console.error('Invalid application ID:', idParam);
      this.error = 'Invalid application ID. Redirecting to applications list...';

      // Give user a moment to see the error message
      setTimeout(() => {
        this.router.navigate(['/applications']);
      }, 2000);
    }
  }

  loadApplication(id: number): void {
    if (!id || isNaN(id)) {
      console.error('Invalid application ID for API call:', id);
      this.error = 'Invalid application ID. Cannot load application.';
      return;
    }

    this.loading = true;
    this.applicationService.getApplicationById(id).subscribe({
      next: (application: Application) => {
        // If we get a valid application back
        if (application) {
          // Convert string date to Date object for the form
          let dateAppliedValue: Date;
          try {
            dateAppliedValue = new Date(application.dateApplied);
          } catch (e) {
            // If conversion fails, use current date
            dateAppliedValue = new Date();
          }

          this.applicationForm.patchValue({
            companyName: application.companyName,
            position: application.position,
            jobDescription: application.jobDescription || '',
            location: application.location || '',
           
            status: application.status,
            dateApplied: dateAppliedValue
          });
        } else {
          this.error = 'Application not found.';
        }
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error loading application:', err);
        this.error = `Failed to load application: ${err.message || 'Unknown error'}`;
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.applicationForm.invalid || !this.applicationId) {
      return;
    }

    this.loading = true;
    this.error = null;

    // Create application object from form
    const formValues = this.applicationForm.value;

    // Format the date to ISO string for API
    const dateValue = formValues.dateApplied;
    const dateApplied = dateValue instanceof Date ? dateValue.toISOString() : dateValue;

    const application: Partial<Application> = {
      id: this.applicationId,
      companyName: formValues.companyName || '',
      position: formValues.position || '',
      jobDescription: formValues.jobDescription || '',
      location: formValues.location || '',
      //Outcome: formValues.outcome !== undefined ? formValues.outcome : false,
      status: formValues.status,
      dateApplied: dateApplied
    };

    // Debug log 
    console.log('Sending to server:', JSON.stringify(application));

    this.applicationService.updateApplication(this.applicationId, application).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/applications']);
      },
      error: (err: any) => {
        console.error('Error updating application:', err);
        console.error('Error details:', err.error); // Log more error details
        this.error = `Failed to update application: ${err.message || 'Unknown error'}`;
        this.loading = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/applications']);
  }
}
