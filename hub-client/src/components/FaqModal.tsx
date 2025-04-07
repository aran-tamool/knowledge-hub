import { FaqType } from "@/types/faq";
import styled from "@emotion/styled";
import { useState } from "react";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  width: 500px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const SaveButton = styled.button`
  background-color: #4f46e5;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #4338ca;
  }
`;

const CancelButton = styled.button`
  background-color: #ccc;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #999;
  }
`;

type Props = {
  isOpen: boolean;
  onClose: () => void;
  faq: FaqType;
  onUpdate: (updatedFaq: FaqType) => void;
};

export const FaqModal: React.FC<Props> = ({
  isOpen,
  onClose,
  faq,
  onUpdate,
}) => {
  const [question, setQuestion] = useState(faq.question);
  const [answer, setAnswer] = useState(faq.answer);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const updatedFaq = { ...faq, question, answer };
    onUpdate(updatedFaq);
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <h2>Update FAQ</h2>
          <CloseButton onClick={onClose}>X</CloseButton>
        </ModalHeader>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="question">Question:</Label>
          <Input
            type="text"
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <Label htmlFor="answer">Answer:</Label>
          <TextArea
            id="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <ButtonContainer>
            <CancelButton type="button" onClick={onClose}>
              Cancel
            </CancelButton>
            <SaveButton type="submit">Save</SaveButton>
          </ButtonContainer>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
};
