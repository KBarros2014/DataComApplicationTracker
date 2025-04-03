import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { AppModule } from './app/app.module';
import { provideNativeDateAdapter } from '@angular/material/core';


bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    provideNativeDateAdapter(),
    importProvidersFrom(AppModule)
  ]
}).catch(err => console.error(err));
