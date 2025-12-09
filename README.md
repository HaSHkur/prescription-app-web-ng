# Prescription Management Web App

This is a web application for managing medical prescriptions, built with Angular. It provides functionalities for user authentication, prescription management (CRUD operations), and data visualization through reports.

## Features

*   **User Authentication:** Users can register and log in to the application.
*   **Prescription Management:** Authenticated users can perform the following operations on prescriptions:
    *   Create new prescriptions.
    *   View a list of all prescriptions.
    *   View the details of a single prescription.
    *   Update existing prescriptions.
    *   Delete prescriptions.
*   **Reporting:** The application provides reports and visualizations of prescription data.

## Technologies Used

*   **Frontend:**
    *   [Angular](https://angular.io/)
    *   [Tailwind CSS](https://tailwindcss.com/) for styling.
*   **Backend:** This application requires a separate backend service to be running. The backend API is expected to be available at `http://localhost:8080/api/v1`.

## Getting Started

### Prerequisites

*   [Node.js](https://nodejs.org/) (which includes npm) installed on your machine.
*   A running instance of the corresponding backend server at `http://localhost:8080`.

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Navigate to the project directory:
    ```bash
    cd prescription-app-web-ng
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```

### Running the Application

1.  Start the development server:
    ```bash
    npm start
    ```
2.  Open your browser and navigate to `http://localhost:4200/`.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.