import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export enum ApplicationStatus {
  Applied = 0,
  InReview = 1,
  Interview = 2,
  Rejected = 3,
  Accepted = 4
}

export interface Application {
  id: number;
  companyName: string;
  position: string;
  jobDescription: string;
  location: string;

  status: ApplicationStatus;
  dateApplied: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private apiUrl = 'https://localhost:7151/api/applications';

  constructor(private http: HttpClient) { }

  getApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(this.apiUrl);
  }

  getApplicationById(id: number): Observable<Application> {
    return this.http.get<Application>(`${this.apiUrl}/${id}`);
  }


  createApplication(application: Partial<Application>): Observable<Application> {
    return this.http.post<Application>(this.apiUrl, application);
  }

 
  addApplication(application: Partial<Application>): Observable<Application> {
    return this.createApplication(application);
  }

  updateApplication(id: number, application: Partial<Application>): Observable<any> {
    // Log what  sending for debugging
    console.log(`Updating application ${id}:`, JSON.stringify(application));
    return this.http.put(`${this.apiUrl}/${id}`, application);
  }

  deleteApplication(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
