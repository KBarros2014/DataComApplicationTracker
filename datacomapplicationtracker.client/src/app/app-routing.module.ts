
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationsListComponent } from './components/applications-list/applications-list.component';
import { ApplicationFormComponent } from './components/application-form/application-form.component';
import { EditApplicationComponent } from './components/edit-application/edit-application.component';

const routes: Routes = [
  { path: '', redirectTo: '/applications', pathMatch: 'full' },
  { path: 'applications', component: ApplicationsListComponent },
  { path: 'add', component: ApplicationFormComponent },
  { path: 'edit/:id', component: EditApplicationComponent },
  { path: '**', redirectTo: '/applications' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
