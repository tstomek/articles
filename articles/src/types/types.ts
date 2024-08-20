export interface NewsAPIArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  source: {
    id: string | null;
    name: string;
  };
  publishedAt: string;
  content?: string;
}
export interface GuardianArticle {
  id: string;
  type: string;
  sectionId: string;
  sectionName: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  fields: {
    headline: string;
    trailText: string;
    byline: string;
    firstPublicationDate: string;
    bodyText: string;
    thumbnail: string;
  };
}

export interface GuardianResponse {
  response: {
    status: string;
    userTier: string;
    total: number;
    startIndex: number;
    pageSize: number;
    currentPage: number;
    pages: number;
    orderBy: string;
    results: GuardianArticle[];
  };
}

export interface GuardianSection {
  id: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  editions: Array<{
    id: string;
    webTitle: string;
    webUrl: string;
    apiUrl: string;
    code: string;
  }>;
}

export interface GuardianTag {
  id: string;
  type: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  references: any[];
  bio: string;
  bylineImageUrl: string;
  largeBylineImageUrl: string;
}

export interface QueryParams {
  q?: string;
  sources?: string;
  language?: string;
  from?: string;
  to?: string;
  sortBy?: "relevancy" | "popularity" | "publishedAt";
  page?: number;
  pageSize?: number;
}
export interface NewsAPIResponse {
  articles: NewsAPIArticle[];
  totalResults: number;
}
