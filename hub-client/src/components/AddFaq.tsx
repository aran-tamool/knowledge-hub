import { useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import { useState } from "react";
import { ASK_AI, AskAIResponse } from "../graphql/askAI";

const AddFaqContainer = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const AddFaqTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  min-height: 100px;
  resize: vertical;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
  gap: 1rem;
`;

const AddButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;
const CloseButton = styled.button`
  background-color: rgb(227, 58, 7);
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: rgb(189, 86, 57);
  }
`;

const AskAiButton = styled.button`
  background-color: #2196f3;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #1976d2;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-bottom: 1rem;
`;

const SuccessMessage = styled.p`
  color: green;
  margin-bottom: 1rem;
`;

interface AddFaqProps {
  onAddFaq?: (question: string, answer: string) => void;
  onClose: () => void;
}

export const AddFaq: React.FC<AddFaqProps> = ({ onAddFaq, onClose }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { loading, refetch: AiRefetch } = useQuery<AskAIResponse>(ASK_AI, {
    skip: true,
  });

  const handleAskAi = async () => {
    setError("");
    setSuccess("");

    if (!question.trim()) {
      setError("Question is required to ask AI.");
      return;
    }

    try {
      const result = await AiRefetch({
        question: question,
      });

      if (result.data?.askAI?.answer) {
        setAnswer(result.data.askAI.answer);
      } else {
        setError("No answer received from AI.");
      }
    } catch (err) {
      setError("Error fetching answer from AI.");
      console.error(err);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!question.trim() || !answer.trim()) {
      setError("Question and answer are required.");
      return;
    }

    if (onAddFaq) {
      onAddFaq(question, answer);
    }

    setSuccess("FAQ added successfully!");
    setQuestion("");
    setAnswer("");
  };

  return (
    <AddFaqContainer>
      <AddFaqTitle>Add New FAQ</AddFaqTitle>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <TextArea
          placeholder="Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <ButtonsContainer>
          <AskAiButton type="button" onClick={handleAskAi} disabled={loading}>
            {loading ? "Asking AI..." : "Ask AI for an answer"}
          </AskAiButton>
          <AddButton type="submit">Add FAQ</AddButton>
          <CloseButton onClick={onClose}>Close</CloseButton>
        </ButtonsContainer>
      </form>
    </AddFaqContainer>
  );
};
