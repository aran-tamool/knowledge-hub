# Knowledge Hub API

This project is a backend API for a Knowledge Hub, built using NestJS, GraphQL, and TypeORM. It provides functionalities for managing FAQs and integrating with an AI service for answering user questions.

## Features

-   **FAQ Management:**
    -   Create, read, update, and delete FAQs.
    -   Search for FAQs based on keywords.
-   **AI Integration:**
    -   Integrates with aimlapi.com to provide AI-powered responses to user questions.
-   **GraphQL API:**
    -   Uses Apollo Server to expose a GraphQL API for interacting with the data.
-   **Database:**
    -   Uses MySQL as the database, managed via TypeORM.
-   **Dockerized:**
    -   The application and its database are containerized using Docker for easy setup and deployment.

## Technologies Used

-   **NestJS:** A progressive Node.js framework for building efficient and scalable server-side applications.
-   **GraphQL:** A query language for APIs and a runtime for fulfilling those queries with your existing data.
-   **Apollo Server:** A production-ready, self-documenting GraphQL server.
-   **TypeORM:** An ORM that can run in NodeJS, Browser, Cordova, PhoneGap, Ionic, React Native, NativeScript, Expo, and Electron platforms.
-   **MySQL:** A popular open-source relational database management system.
-   **Docker:** A platform for developing, shipping, and running applications in containers.
-   **aimlapi.com:** An external service used for AI-powered question answering.

## Getting Started

### Prerequisites

-   Docker and Docker Compose installed.
-   Node.js and npm (or yarn) installed (for local development outside of Docker).

### Installation and Setup

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd hub-api
    ```

2.  **Environment Variables:**

    -   Create a `.env` file in the root directory of the project.
    -   Copy the contents of `.env.example` into `.env`.
    -   Update the values in `.env` as needed, especially:
        -   `AIMLAPI_KEY`: **Important!** You need to obtain an API key from aimlapi.com and set it here.
        -   `AIMLAPI_URL`: This is set by default to `https://api.aimlapi.com/v1/chat/completions`
        -   `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASS`, `DB_NAME`: Database connection details (default values are configured for Docker).

3.  **Running with Docker:**

    ```bash
    yarn start:docker
    ```

    This command will:

    -   Build the Docker image for the API.
    -   Start the MySQL database container.
    -   Start the API container, connecting it to the database.
    - The app will be available on `http://localhost:4000`

4.  **Running Locally (without Docker):**

    ```bash
    yarn install # or npm install
    yarn start:dev # or npm run start:dev
    ```
    - Make sure you have a mysql server running locally.
    - Update the `.env` file with the local mysql server credentials.

### Accessing the GraphQL API

Once the application is running, you can access the GraphQL playground at `http://localhost:4000/graphql`.

## AI Integration (aimlapi.com)

This application utilizes the aimlapi.com service to provide AI-powered responses to user questions.

**Important Note:**

-   You **must** create an account on aimlapi.com to obtain an API key.
-   The API key is required to make requests to the AI service.
-   Set the `AIMLAPI_KEY` environment variable in your `.env` file with your API key.
- The endpoint is set by default to `https://api.aimlapi.com/v1/chat/completions`

## API Endpoints

### FAQs

-   `getAllFaqs`: Retrieves all FAQs.
-   `getFaqById`: Retrieves a specific FAQ by ID.
-   `createFaq`: Creates a new FAQ.
-   `updateFaq`: Updates an existing FAQ.
-   `deleteFaq`: Deletes an FAQ by ID.
- `searchFaqs`: Search for FAQs based on keywords.

### AI

-   `askAI`: Sends a question to the AI service and returns the response.

## Development

-   **Code Style:** The project uses Prettier and ESLint for code formatting and linting.
-   **Testing:** Jest is used for unit and integration testing.
    -   `yarn test` or `npm run test`
    -   `yarn test:watch` or `npm run test:watch`
    -   `yarn test:cov` or `npm run test:cov`



