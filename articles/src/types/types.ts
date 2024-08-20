// src/types/types.ts

// NewsAPI Types
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
  content?: string; // Optional
}

// Guardian API Types
export interface GuardianArticle {
  id: string;
  webTitle: string;
  webUrl: string;
  fields?: {
    thumbnail?: string;
  };
  webPublicationDate?: string;
}

// General Article Type used in the application
export interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt?: string;
  content?: string; // Optional
  sourceName?: string; // To handle the source name, when filtering or displaying
  id?: string; // For key handling in list rendering
}

// Sidebar Types
export interface Source {
  id: string;
  name: string;
  category: string;
}

export interface Category {
  id: string;
  name: string;
}

// Custom hooks types
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

// Response types
export interface NewsAPIResponse {
  articles: NewsAPIArticle[];
  totalResults: number;
}

export interface GuardianResponse {
  response: {
    results: GuardianArticle[];
    total: number;
  };
}
