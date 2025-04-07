# Knowledge Hub Client

This project is a client-side application for a Knowledge Hub, built using Next.js, React, and Apollo Client. It allows users to manage a database of Frequently Asked Questions (FAQs) and interact with an AI-powered question-answering system.

## Features

-   **FAQ Management:**
    -   View a list of FAQs.
    -   Search for FAQs by question.
    -   Add new FAQs.
    -   Update existing FAQs.
    -   Delete FAQs.
-   **AI Integration:**
    -   Ask questions to an AI and receive answers.

## Technologies Used

-   **Next.js:** A React framework for building server-rendered and static web applications.
-   **React:** A JavaScript library for building user interfaces.
-   **Apollo Client:** A comprehensive state management library for JavaScript that enables you to manage both local and remote data with GraphQL.
-   **GraphQL:** A query language for APIs and a runtime for fulfilling those queries with your existing data.
-   **Emotion:** A library designed for writing CSS styles with JavaScript.
-   **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.

## Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```
    (Replace `<repository-url>` with the actual repository URL.)

2.  **Navigate to the project directory:**
    ```bash
    cd hub-client
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```
    or
    ```bash
    yarn install
    ```

## Running the Application

1.  **Start the development server:**
    ```bash
    npm run dev
    ```
    or
    ```bash
    yarn dev
    ```

2.  **Open your browser and go to:** `http://localhost:3000`

## Key Components

### AskAI (src/graphql/askAI.ts)

The `askAI.ts` file defines the GraphQL query for interacting with the AI question-answering system.

-   **Purpose:** This component allows users to ask questions to an AI and receive answers.
-   **GraphQL Query:**
    ```graphql
    query AskAI($question: String!) {
      askAI(question: $question) {
        answer
      }
    }
    ```
-   **Functionality:**
    -   The `ASK_AI` query sends a user's question to the server.
    -   The server processes the question using an AI model.
    -   The server returns an `answer` string.
    -   The `AskAIResponse` interface defines the expected structure of the response.

### FAQs (src/graphql/faqs.ts)

The `faqs.ts` file defines the GraphQL queries and mutations for managing FAQs.

-   **Purpose:** This component allows users to manage a database of Frequently Asked Questions.
-   **GraphQL Operations:**
    -   **`GET_FAQS`:** Retrieves all FAQs from the server.
        ```graphql
        query {
          getAllFaqs {
            answer
            question
            id
          }
        }
        ```
    -   **`SEARCH_FAQS`:** Searches for FAQs based on a search string.
        ```graphql
        query ($search: String!) {
          searchFaqs(search: $search) {
            id
            question
            answer
          }
        }
        ```
    -   **`CREATE_FAQ`:** Creates a new FAQ.
        ```graphql
        mutation CreateFaq($question: String!, $answer: String!) {
          createFaq(input: { question: $question, answer: $answer }) {
            id
            question
            answer
          }
        }
        ```
    -   **`UPDATE_FAQ`:** Updates an existing FAQ.
        ```graphql
        mutation UpdateFaq($id: Int!, $question: String!, $answer: String!) {
          updateFaq(input: { id: $id, question: $question, answer: $answer }) {
            id
            question
            answer
          }
        }
        ```
    -   **`DELETE_FAQ`:** Deletes an FAQ by its ID.
        ```graphql
        mutation DeleteFaq($id: Int!) {
          deleteFaq(id: $id) {
            success
            message
          }
        }
        ```

## Main Page (src/pages/index.tsx)

The `index.tsx` file is the main page of the application. It handles:

-   Displaying the list of FAQs.
-   Searching for FAQs.
-   Adding new FAQs.
-   Updating and deleting FAQs.
-   Managing the UI state (e.g., showing/hiding the "Add FAQ" form).
-   Fetching data from the server using Apollo Client.
-   Using the `useQuery` and `useMutation` hooks to interact with the GraphQL API.


