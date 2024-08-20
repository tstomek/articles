import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { GuardianResponse, GuardianSection, GuardianTag } from "../types/types";

const GUARDIAN_API_KEY = "802d9792-f5e7-49b3-a683-badd423c0190";

const fetchGuardianArticles = async (queryParams: {
  q?: string;
  section?: string;
  tag?: string;
  page?: number;
  pageSize?: number;
}): Promise<GuardianResponse> => {
  const { data } = await axios.get("https://content.guardianapis.com/search", {
    params: {
      "api-key": GUARDIAN_API_KEY,
      q: queryParams.q || "general",
      section: queryParams.section,
      tag: queryParams.tag,
      page: queryParams.page || 1,
      pageSize: queryParams.pageSize || 12,
    },
  });
  return data;
};
const fetchGuardianSections = async (): Promise<GuardianSection[]> => {
  const { data } = await axios.get(
    "https://content.guardianapis.com/sections",
    {
      params: {
        "api-key": GUARDIAN_API_KEY,
      },
    },
  );
  return data.response.results;
};
const fetchGuardianTags = async (): Promise<GuardianTag[]> => {
  const { data } = await axios.get("https://content.guardianapis.com/tags", {
    params: {
      "api-key": GUARDIAN_API_KEY,
      type: "keyword", // Only fetch tags of type keyword
    },
  });
  return data.response.results;
};
export const useGuardianAPI = (queryParams: {
  q?: string;
  section?: string;
  tag?: string;
  page?: number;
  pageSize?: number;
}) => {
  const articlesQuery = useQuery({
    queryKey: ["guardianArticles", queryParams],
    queryFn: () => fetchGuardianArticles(queryParams),
    enabled: true,
  });

  const sectionsQuery = useQuery({
    queryKey: ["guardianSections"],
    queryFn: fetchGuardianSections,
    enabled: true,
  });

  const tagsQuery = useQuery({
    queryKey: ["guardianTags"],
    queryFn: fetchGuardianTags,
    enabled: true,
  });

  return {
    articles: articlesQuery.data,
    sections: sectionsQuery.data,
    tags: tagsQuery.data,
    isLoading:
      articlesQuery.isLoading || sectionsQuery.isLoading || tagsQuery.isLoading,
    isError:
      articlesQuery.isError || sectionsQuery.isError || tagsQuery.isError,
  };
};
