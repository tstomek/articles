import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_KEY = "12d5bdfb12e84e83bfadc0b667f11e6d";

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  source: { id: string; name: string };
}

interface QueryParams {
  q?: string;
  sources?: string;
  language?: string;
  from?: string;
  to?: string;
  sortBy?: "relevancy" | "popularity" | "publishedAt";
  page?: number;
  pageSize?: number;
}

const fetchArticles = async (
  queryParams: QueryParams,
): Promise<{ articles: Article[]; totalResults: number }> => {
  const { data } = await axios.get("https://newsapi.org/v2/everything", {
    params: {
      apiKey: API_KEY,
      q: queryParams.q || "general",
      sources: queryParams.sources,
      language: queryParams.language,
      from: queryParams.from,
      to: queryParams.to,
      sortBy: queryParams.sortBy,
      page: queryParams.page,
      pageSize: queryParams.pageSize || 12,
    },
  });
  return { articles: data.articles, totalResults: data.totalResults };
};

export const useNewsAPI = (queryParams: QueryParams) => {
  return useQuery({
    queryKey: ["news", queryParams],
    queryFn: () => fetchArticles(queryParams),
    enabled: true, // Always enabled to fetch articles
  });
};
