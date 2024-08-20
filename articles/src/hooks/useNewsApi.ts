import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { NewsAPIResponse, QueryParams } from "../types/types";

const API_KEY = "df90940f1a3c4d22961e898f4ef4aa80";

const fetchArticles = async (
  queryParams: QueryParams,
): Promise<NewsAPIResponse> => {
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
    enabled: true,
  });
};
