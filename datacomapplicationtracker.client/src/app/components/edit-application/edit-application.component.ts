import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Application, ApplicationService } from '../../services/application.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-application',
  templateUrl: './edit-application.component.html',
  styleUrls: ['./edit-application.component.css'],
  providers: [DatePipe],
  standalone: false  // Explicitly set to false
})
export class EditApplicationComponent implements OnInit {
  applicationForm: FormGroup;
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
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.applicationId = +idParam;
      this.loadApplication(this.applicationId);
    } else {
      this.router.navigate(['/applications']);
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
    if (this.applicationForm.invalid || !this.applicationId) {
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
  }

  cancel(): void {
    this.router.navigate(['/applications']);
  }
}
