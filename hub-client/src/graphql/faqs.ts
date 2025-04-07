import { gql } from "@apollo/client";

export const GET_FAQS = gql`
  query {
    getAllFaqs {
      answer
      question
      id
    }
  }
`;
export const SEARCH_FAQS = gql`
  query ($search: String!) {
    searchFaqs(search: $search) {
      id
      question
      answer
    }
  }
`;

export const CREATE_FAQ = gql`
  mutation CreateFaq($question: String!, $answer: String!) {
    createFaq(input: { question: $question, answer: $answer }) {
      id
      question
      answer
    }
  }
`;

export const UPDATE_FAQ = gql`
  mutation UpdateFaq($id: Int!, $question: String!, $answer: String!) {
    updateFaq(input: { id: $id, question: $question, answer: $answer }) {
      id
      question
      answer
    }
  }
`;

export const DELETE_FAQ = gql`
  mutation DeleteFaq($id: Int!) {
    deleteFaq(id: $id) {
      success
      message
    }
  }
`;
