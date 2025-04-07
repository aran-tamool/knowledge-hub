// types/faq.ts
export interface FaqType {
  id: number;
  question: string;
  answer: string;
  // questionSnippet?: number;
  // createdAt?: string;
  // updatedAt?: string;
}

export interface GetFaqsData {
  getAllFaqs: FaqType[];
}

export interface SearchFaqs {
  searchFaqs: FaqType[];
}
