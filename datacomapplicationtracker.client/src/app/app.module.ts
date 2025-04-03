import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ApplicationService } from './services/application.service';

// Date adapter import
import { provideNativeDateAdapter } from '@angular/material/core';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    AppRoutingModule,
    AppComponent, // Since AppComponent is standalone
  ],
  providers: [
    ApplicationService,
    provideNativeDateAdapter() // Provide the date adapter
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
