# OneBox Web App

## Overview

The OneBox Web App is a functional web application designed to manage and interact with email threads using a clean and modern interface. The app integrates with the OneBox API to fetch, display, and manage emails, including features such as custom reply functionality, keyboard shortcuts, and a custom text editor.

## Features

- **Login Page**: Simple and intuitive login page designed for user authentication.
- **OneBox Screen**: After logging in, users are directed to the OneBox screen where they can view and manage email threads.
- **Email Management**: 
  - Fetch email threads using the OneBox API.
  - View details of specific email threads.
  - Delete email threads.
- **Keyboard Shortcuts**: 
  - Press “D” to delete the selected email thread.
  - Press “R” to open the reply box for the selected email thread.
- **Custom Text Editor**:
  - Integrated custom text editor with a "SAVE" button and "Variables" button for enhanced email composition.
- **Reply Functionality**:
  - Send replies to email threads with the ability to specify `from`, `to`, `subject`, and `body`.

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-repository/onebox-web-app.git
   ```

2. **Navigate to the Project Directory**:

   ```bash
   cd onebox-web-app
   ```

3. **Install Dependencies**:

   ```bash
   npm install
   ```

4. **Start the Development Server**:

   ```bash
   npm start
   ```

   The application will be available at `http://localhost:3000`.

## API Endpoints

- **Login**: Redirects to Google login page.
  - `GET /google-login`

- **Fetch Email Threads**:
  - `GET /onebox/list`

- **View Email Thread**:
  - `GET /onebox/:thread_id`

- **Delete Email Thread**:
  - `DELETE /onebox/:thread_id`

- **Reply to Email Thread**:
  - `POST /reply/:thread_id`
  - **Request Body**:
    ```json
    {
      "from": "email",
      "to": "email",
      "subject": "",
      "body": "<html></html>"
    }
    ```

## Deployed Link

The application is deployed and accessible at: [OneBox Web App](https://project-reach-inbox.vercel.app/)

## Development Notes

- **No External Libraries**: The application is built without additional libraries to ensure clean and minimal dependencies.
- **No React Router DOM**: Navigation is managed without using React Router DOM.
