# Job Application Tracker

A full-stack application for tracking job applications, built with ASP.NET Core Web API backend and Angular frontend.

## Prerequisites

Before you begin, make sure you have the following installed:

1. **Node.js** (v18.x or later)
   - Download from: https://nodejs.org/
   - Choose the LTS (Long Term Support) version

2. **.NET 7.0 SDK** or later
   - Download from: https://dotnet.microsoft.com/download/dotnet/7.0

3. **SQL Server** (Express edition is sufficient)
   - SQL Server should be installed and running on your system

## Setup Instructions

### Step 1: Run the Server Project First

1. Open the solution in Visual Studio 
2. Right-click on the `DataComApplicationTracker.Server` project
3. Select "Set as Startup Project"
4. Press F5 or click the "Start" button to run the server
5. The database will be automatically created with the default connection string
6. The API will be available at: `https://localhost:7151`
7. You can access Swagger UI at: `https://localhost:7151/swagger`

### Step 2: Run the Angular Frontend

1. After the server is running, right-click on the solution and select "Configure Startup Projects"
2. Select "Multiple startup projects"
3. Set both the Server and Client projects to "Start"
4. Press F5 or click the "Start" button to run both projects together
5. The Angular application should open automatically in your browser

### Alternative: Running Frontend Manually

If you prefer to run the frontend manually:

1. Open a command prompt and navigate to the client project directory:
   ```
   cd path\to\datacomapplicationtracker.client
   ```

2. Install the required Node.js packages:
   ```
   npm install
   ```

3. Start the Angular application:
   ```
   ng serve --open
   ```

4. The application will open in your default web browser at: `http://localhost:4200`

## Using the Application

### View Applications
- The home page displays all your job applications in a table
- You can see the company name, position, status, date applied, and outcome

### Add a New Application
1. Click the "Add Job Application" button at the bottom of the page
2. Fill out the form with the job details
3. Click "Save" to add the application

### Edit an Application
1. Click the "Edit" button for the application you want to update
2. Update any details, including changing the status
3. Click "Update" to save your changes

## Features

- **RESTful API** with endpoints for creating, reading, updating, and deleting job applications
- **Entity Framework Core** with SQL Server database
- **Repository pattern** and dependency injection
- **Async/await** for efficient database operations
- **Angular Material** for a clean, modern UI
- **Form validation** to ensure data quality
- **Status tracking** to monitor application progress

## Assumptions Made

1. **Authentication**: This application is intended for personal use and doesn't include user authentication.
2. **Status Options**: The application uses five status options: Applied, In Review, Interview, Rejected, and Accepted.
3. **Single User**: All job applications are visible within the system without user-specific views.

## Troubleshooting

### Issues with Running Both Projects
- Make sure to start the server project first before running the client
- Use the "Multiple startup projects" option in Visual Studio for a smoother experience
- The server must be running at `https://localhost:7151` for the Angular app to communicate with it

### Angular Dependencies Issues
- Make sure you have the correct version of Node.js installed
- Try running `npm install` again if you encounter any errors
- Clear the npm cache with `npm cache clean --force` if needed

### Browser Security Warnings
- You might see security warnings about the development certificate
- These are normal in a development environment
- Click "Advanced" and then "Proceed" to continue to the application



 <img src="https://github.com/KBarros2014/DataComApplicationTracker/blob/main/DataComApplicationTracker.Server/Screenshot%202025-04-04%20104835.png" width="auto" title="hover text">
