// src/hooks/useGuardianAPI.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { GuardianResponse } from "../types/types";

const GUARDIAN_API_KEY = "802d9792-f5e7-49b3-a683-badd423c0190"; // Replace with your actual Guardian API key

const fetchGuardianArticles = async (queryParams: {
  q?: string;
  page?: number;
  pageSize?: number;
}): Promise<GuardianResponse> => {
  const { data } = await axios.get("https://content.guardianapis.com/search", {
    params: {
      "api-key": GUARDIAN_API_KEY,
      q: queryParams.q || "general",
      page: queryParams.page || 1,
      pageSize: queryParams.pageSize || 12,
      // You can add more query parameters as needed
    },
  });
  return data;
};

export const useGuardianAPI = (queryParams: {
  q?: string;
  page?: number;
  pageSize?: number;
}) => {
  return useQuery({
    queryKey: ["guardian", queryParams],
    queryFn: () => fetchGuardianArticles(queryParams),
    enabled: true,
  });
};
