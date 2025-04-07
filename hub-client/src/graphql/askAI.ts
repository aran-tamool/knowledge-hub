import { gql } from "@apollo/client";

export interface AskAIResponse {
  askAI: {
    answer: string;
  };
}

export const ASK_AI = gql`
  query AskAI($question: String!) {
    askAI(question: $question) {
      answer
    }
  }
`;
