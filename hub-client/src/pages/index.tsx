import { AddFaq } from "@/components/AddFaq";
import { FaqTable } from "@/components/FaqTable";
import {
  CREATE_FAQ,
  DELETE_FAQ,
  GET_FAQS,
  SEARCH_FAQS,
  UPDATE_FAQ,
} from "@/graphql/faqs";
import { FaqType, GetFaqsData, SearchFaqs } from "@/types/faq";
import { useMutation, useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";

const MainContainer = styled.main`
  padding: 1.5rem;
  max-width: 5xl;
  margin: 0 auto;
`;
const HeaderContainer = styled.div`
  display: block;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const SearchInput = styled.input`
  border: 1px solid #ccc;
  padding: 0.5rem 0.75rem;
  width: 100%;
  max-width: 32rem;
  margin-bottom: 1.5rem;
`;

const AddFaqButton = styled.button`
  margin-left: auto;
  display: block;
  background-color: #3b82f6;
  color: white;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
  &:hover {
    background-color: #2563eb;
  }
`;
const SearchFaqButton = styled.button`
  background-color: rgb(3, 50, 22);
  color: white;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
  margin-left: 1rem;
  &:hover {
    background-color: rgb(27, 104, 53);
  }
`;

export default function Home() {
  const [searchInputField, setSearchInputField] = useState("");
  const [showAddFaq, setShowAddFaq] = useState(false);
  const [faqsToDisplay, setFaqsToDisplay] = useState<FaqType[]>([]);
  const {
    data: getFagsData,
    loading,
    error,
    refetch: getAllFaqsRefetch,
  } = useQuery<GetFaqsData>(GET_FAQS);
  const shouldRunSearch = searchInputField.trim().length > 10;

  const { data: searchData, refetch: searchRefetch } = useQuery<SearchFaqs>(
    SEARCH_FAQS,
    {
      variables: { search: searchInputField },
      skip: !shouldRunSearch,
    }
  );
  const [createFaq] = useMutation(CREATE_FAQ);
  const [updateFaq] = useMutation(UPDATE_FAQ);
  const [deleteFaq] = useMutation(DELETE_FAQ);

  const handleAddFaq = async (question: string, answer: string) => {
    try {
      await createFaq({
        variables: {
          question,
          answer,
        },
      });
      getAllFaqsRefetch();
      handleShowAddFaq(false);
    } catch (error) {
      console.error("Error creating FAQ:", error);
    }
  };
  const handleUpdateFaq = async (faq: FaqType) => {
    try {
      await updateFaq({
        variables: {
          ...faq,
        },
      });
      getAllFaqsRefetch();
    } catch (error) {
      console.error("Error update FAQ:", error);
    }
  };
  const handleDeleteFaq = async (id: number) => {
    try {
      await deleteFaq({
        variables: {
          id,
        },
      });
      getAllFaqsRefetch();
    } catch (error) {
      console.error("Error update FAQ:", error);
    }
  };

  const handleShowAddFaq = (show: boolean) => {
    setShowAddFaq(show);
  };
  const handleSearch = async () => {
    searchRefetch();
  };

  useEffect(() => {
    if (searchData && searchInputField.length) {
      setFaqsToDisplay(searchData?.searchFaqs);
    } else {
      setFaqsToDisplay(getFagsData?.getAllFaqs || []);
    }
  }, [getFagsData?.getAllFaqs, searchData, searchInputField]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading FAQs</p>;

  return (
    <MainContainer>
      <HeaderContainer>
        <Title>FAQ Knowledge Base</Title>
        <SearchInput
          type="text"
          placeholder="Search..."
          value={searchInputField}
          onChange={(e) => {
            setSearchInputField(e.target.value);
          }}
        />
        <SearchFaqButton onClick={handleSearch}>
          Search a question
        </SearchFaqButton>

        <AddFaqButton onClick={() => handleShowAddFaq(true)}>
          Add New FAQ
        </AddFaqButton>
      </HeaderContainer>
      {showAddFaq && (
        <AddFaq
          onAddFaq={handleAddFaq}
          onClose={() => handleShowAddFaq(false)}
        />
      )}
      {loading && <p>Loading...</p>}
      {error && <p>Error loading FAQs</p>}
      {faqsToDisplay.length > 0 ? (
        <FaqTable
          faqs={faqsToDisplay}
          onUpdateFaq={handleUpdateFaq}
          onDeleteFaq={handleDeleteFaq}
        />
      ) : (
        <p>No FAQs found.</p>
      )}
    </MainContainer>
  );
}
