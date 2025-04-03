import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Application, ApplicationService } from '../../services/application.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.css'],
  providers: [DatePipe],
  standalone: false  // Explicitly set to false
})
export class ApplicationFormComponent implements OnInit {
  applicationForm: FormGroup;
  isEditMode = false;
  applicationId: number | null = null;
  loading = false;
  error: string | null = null;

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
      status: ['Applied', Validators.required],
      dateApplied: [new Date(), Validators.required]
    });
  }

  ngOnInit(): void {
    // Check if we're in edit mode by looking for an ID parameter
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.applicationId = +idParam;
      this.loadApplication(this.applicationId);
    }
  }

  loadApplication(id: number): void {
    this.loading = true;
    this.applicationService.getApplicationById(id).subscribe({
      next: (application: Application) => {
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
          status: application.status,
          dateApplied: dateAppliedValue
        });
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error loading application:', err);
        this.error = `Failed to load application: ${err.message}`;
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.applicationForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = null;

    // Create application object from form
    const formValues = this.applicationForm.value;

    // Format the date to ISO string for API
    const dateValue = formValues.dateApplied;
    const dateApplied = this.datePipe.transform(dateValue, 'yyyy-MM-dd') || '';

    const application: Partial<Application> = {
      companyName: formValues.companyName || '',
      position: formValues.position || '',
      status: formValues.status || '',
      dateApplied: dateApplied
    };

    if (this.isEditMode && this.applicationId) {
      // Update existing application
      this.applicationService.updateApplication(this.applicationId, application).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/applications']);
        },
        error: (err: any) => {
          console.error('Error updating application:', err);
          this.error = `Failed to update application: ${err.message}`;
          this.loading = false;
        }
      });
    } else {
      // Add new application
      this.applicationService.addApplication(application).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/applications']);
        },
        error: (err: any) => {
          console.error('Error adding application:', err);
          this.error = `Failed to add application: ${err.message}`;
          this.loading = false;
        }
      });
    }
  }
}
