import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_KEY = "12d5bdfb12e84e83bfadc0b667f11e6d";

interface Source {
  id: string;
  name: string;
  category: string;
}

const fetchSources = async (): Promise<Source[]> => {
  const { data } = await axios.get("https://newsapi.org/v2/sources", {
    params: {
      apiKey: API_KEY,
    },
  });
  return data.sources;
};

export const useNewsSources = () => {
  return useQuery({
    queryKey: ["sources"],
    queryFn: fetchSources,
  });
};
