import { FaqType } from "@/types/faq";
import styled from "@emotion/styled";
import React, { useState } from "react";
import { FaqModal } from "./FaqModal";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Th = styled.th`
  text-align: left;
  padding: 12px;
  background-color: #f3f4f6;
  border-bottom: 2px solid #e5e7eb;
  &:last-child {
    text-align: right; /* Align the last Th (Actions) to the right */
  }
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #e5e7eb;
  &:last-child {
    text-align: right; /* Align the last Td (Actions) to the right */
    white-space: nowrap; /* Prevent buttons from wrapping */
  }
`;

const Tr = styled.tr`
  &:hover {
    background-color: #f9fafb;
  }
`;

const UpdateButton = styled.button`
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
const DeleteButton = styled.button`
  background-color: rgb(188, 32, 14);
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: rgb(147, 57, 41);
  }
`;

const FaqQuestion = styled.div`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const FaqAnswer = styled.div`
  margin-top: 8px;
  padding: 8px;
  border-top: 1px solid #e5e7eb;
  color: rgb(89, 95, 107);

  & > span {
    font-weight: bold;
    color: #333;
  }
`;

type Props = {
  faqs: FaqType[];
  onUpdateFaq: (updatedFaq: FaqType) => void;
  onDeleteFaq: (id: number) => void;
};

export const FaqTable: React.FC<Props> = ({
  faqs,
  onUpdateFaq,
  onDeleteFaq,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState<FaqType | null>(null);
  const [expandedFaqId, setExpandedFaqId] = useState<number | null>(null);

  const handleUpdateClick = (faq: FaqType) => {
    setSelectedFaq(faq);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedFaq(null);
  };

  const handleFaqUpdate = (updatedFaq: FaqType) => {
    onUpdateFaq(updatedFaq);
    handleModalClose();
  };
  const handleFaqDelete = (id: number) => {
    onDeleteFaq(id);
    handleModalClose();
  };

  const handleFaqClick = (faqId: number) => {
    setExpandedFaqId(expandedFaqId === faqId ? null : faqId);
  };

  return (
    <>
      <Table>
        <thead>
          <Tr>
            <Th>ID</Th>
            <Th>FAQ</Th>
            <Th>Actions</Th>
          </Tr>
        </thead>
        <tbody>
          {faqs.map((faq, index) => (
            <React.Fragment key={faq.id}>
              <Tr>
                <Td>{index + 1}</Td>
                <Td>
                  <FaqQuestion onClick={() => handleFaqClick(faq.id)}>
                    {faq.question}
                  </FaqQuestion>
                  {expandedFaqId === faq.id && (
                    <FaqAnswer>
                      {" "}
                      <span>ANS:</span> {faq.answer}
                    </FaqAnswer>
                  )}
                </Td>
                <Td>
                  <UpdateButton onClick={() => handleUpdateClick(faq)}>
                    Update
                  </UpdateButton>
                  <DeleteButton onClick={() => handleFaqDelete(faq.id)}>
                    Delete
                  </DeleteButton>
                </Td>
              </Tr>
            </React.Fragment>
          ))}
        </tbody>
      </Table>
      {isModalOpen && selectedFaq && (
        <FaqModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          faq={selectedFaq}
          onUpdate={handleFaqUpdate}
        />
      )}
    </>
  );
};
