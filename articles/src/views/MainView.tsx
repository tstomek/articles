import React, { useState } from "react";
import { Box, Container, Grid, Pagination } from "@mui/material";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ArticleCard from "../components/ArticleCard";
import { useNewsSources } from "../hooks/useNewsSources";
import { useNewsAPI } from "../hooks/useNewsApi";

const MainView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedSource, setSelectedSource] = useState<string | undefined>();
  const [selectedCategory, setSelectedCategory] = useState<
    string | undefined
  >();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const {
    data: articlesData,
    isLoading: articlesLoading,
    isError: articlesError,
  } = useNewsAPI({
    q: searchQuery || "general",
    sources: selectedSource,
    page: currentPage,
    pageSize: 12,
  });

  const articles = articlesData?.articles;
  const totalResults = articlesData?.totalResults || 0;
  const totalPages = Math.ceil(totalResults / 12); // Calculate total pages

  const {
    data: sources,
    isLoading: sourcesLoading,
    isError: sourcesError,
  } = useNewsSources();

  const handleSearch = (query: string) => setSearchQuery(query);

  const handleFilter = (type: "category" | "source", value: string) => {
    if (type === "category") {
      setSelectedCategory(value);
      const filteredSources = sources?.filter(
        (source) => source.category === value,
      );
      setSelectedSource(filteredSources?.map((source) => source.id).join(","));
    } else if (type === "source") {
      setSelectedSource(value);
      setSelectedCategory(undefined);
    }
  };

  const categories = Array.from(
    new Set(sources?.map((source) => source.category) || []),
  );
  const sourceOptions =
    sources?.map((source) => ({ id: source.id, name: source.name })) || [];

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurrentPage(value);
  };

  return (
    <>
      <Navbar onSearch={handleSearch} />
      <Container>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={3}>
            {sourcesLoading && <div>Loading sources...</div>}
            {sourcesError && <div>Error fetching sources</div>}
            {!sourcesLoading && !sourcesError && (
              <Sidebar
                categories={categories}
                sources={sourceOptions}
                onFilter={handleFilter}
              />
            )}
          </Grid>
          <Grid item xs={12} md={9}>
            <Box display="flex" flexWrap="wrap" gap={2}>
              {articlesLoading && <div>Loading articles...</div>}
              {articlesError && <div>Error fetching articles</div>}
              {articles?.map((article) => (
                <ArticleCard key={article.url} article={article} />
              ))}
            </Box>
            <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default MainView;
