
export interface FaqType {
  id: number;
  question: string;
  answer: string;
}

export interface GetFaqsData {
  getAllFaqs: FaqType[];
}

export interface SearchFaqs {
  searchFaqs: FaqType[];
}
