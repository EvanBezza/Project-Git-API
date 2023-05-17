# GitHub User Explorer App

This is a simple web application that interacts with the GitHub API to search for GitHub users, display their details, and provide information about their repositories. The app is built using Node.js for the backend and React for the frontend.

## Features

- Search for GitHub users by their username
- Display the list of GitHub users based on the search term
- Show a detailed view of a user's profile including their repositories
- Show a detailed view of a specific repository including the latest commits

## Installation

Before installing, make sure you have Node.js and npm installed on your system. You can check this by running `node -v` and `npm -v` in your terminal. If not installed, you can download Node.js and npm [here](https://nodejs.org/en/download/).

After confirming that Node.js and npm are installed, follow the steps below to install the app:

1. Clone the repository:
    ```bash
    git clone <repository-url>
    ```

2. Navigate into the directory of the cloned repository:
    ```bash
    cd <repository-name>
    ```

3. Install the backend dependencies:
    ```bash
    cd backend
    npm install
    ```

4. Install the frontend dependencies:
    ```bash
    cd ../frontend
    npm install
    ```

5. Update Frontend package.json to use a proxy on port 8000

## Configuring Environment Variables

The backend server requires a GitHub token to interact with the GitHub API. 

1. Generate a personal access token on GitHub: 
   - Go to [GitHub's token settings](https://github.com/settings/tokens)
   - Click on "Generate new token", select the necessary scopes, and generate the token

2. Create a `.env` file in the backend root directory and set the "your_github_token" to the generated token:
    ```bash
    GITHUB_TOKEN=your_github_token
    ```

## Running the App

1. Start the backend server:
    - Navigate to the backend directory: `cd backend`
    - Start the server: `npm run dev`
    - If successful, you should see `Server running on port 8000`

2. Start the frontend server:
    - Open a new terminal tab or window
    - Navigate to the frontend directory: `cd frontend`
    - Start the server: `npm start`
    - If successful, your default browser should open to `localhost:3000`

Now, you can explore the app by searching for GitHub users and clicking on their profiles to view more details.

## Technology Stack

- Backend: Node.js, Express.js
- Frontend: React.js
- Routing: react-router-dom
- Loading Spinner: react-loader-spinner
- HTTP Client: native https module
- Security: helmet
- Environment Variables: dotenv

## App Structure

- `Server.js`: Backend server setup and API route definitions
- `App.js`: Main React component that wraps the entire app and sets up routing
- `Search.js`: Component for user search functionality
- `UserList.js`: Component to display a list of users based on search
- `UserDetails.js`: Component to display detailed info about a user and their repositories
- `RepoDetails.js`: Component to display detailed info about a specific repository
- `Loader.js`: Component for displaying a loading spinner during data fetching