import React, { useState, useEffect } from "react";
import { Grid, Container, Box, Pagination, Tabs, Tab } from "@mui/material";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ArticleCard from "../components/ArticleCard";
import { useNewsSources } from "../hooks/useNewsSources";
import { useGuardianAPI } from "../hooks/useGuardianApi";
import { useNewsAPI } from "../hooks/useNewsApi";

const MainView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>(""); // Initial empty query
  const [selectedSource, setSelectedSource] = useState<string | undefined>();
  const [selectedCategory, setSelectedCategory] = useState<
    string | undefined
  >();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [tabIndex, setTabIndex] = useState<number>(0); // Add tab index to manage tabs

  const {
    data: newsArticlesData,
    isLoading: newsLoading,
    isError: newsError,
  } = useNewsAPI({
    q: searchQuery || "general",
    sources: selectedSource,
    page: currentPage,
    pageSize: 12,
  });

  // Fetch articles from Guardian
  const {
    data: guardianArticlesData,
    isLoading: guardianLoading,
    isError: guardianError,
  } = useGuardianAPI({
    q: searchQuery || "general",
    page: currentPage,
    pageSize: 12,
  });

  const newsArticles = newsArticlesData?.articles;
  const guardianArticles = guardianArticlesData?.response.results;
  const totalResults =
    tabIndex === 0
      ? newsArticlesData?.totalResults || 0
      : guardianArticlesData?.response.total || 0;
  const totalPages = Math.ceil(totalResults / 12); // Calculate total pages

  const {
    data: sources,
    isLoading: sourcesLoading,
    isError: sourcesError,
  } = useNewsSources();

  // Extract categories and source options
  const categories = Array.from(
    new Set(sources?.map((source) => source.category) || []),
  ); // Unique categories
  const sourceOptions =
    sources?.map((source) => ({ id: source.id, name: source.name })) || []; // Source IDs for filtering

  // Handle search input
  const handleSearch = (query: string) => setSearchQuery(query);

  // Handle filter changes
  const handleFilter = (type: "category" | "source", value: string) => {
    if (type === "category") {
      setSelectedCategory(value);
      // Filter sources by category
      const filteredSources = sources?.filter(
        (source) => source.category === value,
      );
      setSelectedSource(filteredSources?.map((source) => source.id).join(","));
    } else if (type === "source") {
      setSelectedSource(value);
      setSelectedCategory(undefined); // Reset category filter when source changes
    }
  };

  // Handle page change
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurrentPage(value);
  };

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
    setCurrentPage(1);
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
            <Box sx={{ mb: 2 }}>
              {/* Tabs for switching between NewsAPI and Guardian */}
              <Tabs
                value={tabIndex}
                onChange={handleTabChange}
                aria-label="news source tabs"
              >
                <Tab label="NewsAPI" />
                <Tab label="The Guardian" />
              </Tabs>
            </Box>
            <Box display="flex" flexWrap="wrap" gap={2}>
              {tabIndex === 0 && (
                <>
                  {newsLoading && <div>Loading articles...</div>}
                  {newsError && <div>Error fetching articles</div>}
                  {newsArticles?.map((article) => (
                    <ArticleCard key={article.url} article={article} />
                  ))}
                </>
              )}
              {tabIndex === 1 && (
                <>
                  {guardianLoading && <div>Loading articles...</div>}
                  {guardianError && <div>Error fetching articles</div>}
                  {guardianArticles?.map((article) => (
                    <ArticleCard
                      key={article.webUrl}
                      article={{
                        title: article.webTitle,
                        description: article.fields?.thumbnail
                          ? "Thumbnail available"
                          : "No description",
                        url: article.webUrl,
                        urlToImage: article.fields?.thumbnail || null,
                      }}
                    />
                  ))}
                </>
              )}
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
