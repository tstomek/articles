import React, { useState } from "react";
import { Grid, Container, Box, Pagination, Tabs, Tab } from "@mui/material";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ArticleCard from "../components/ArticleCard";
import { useNewsSources } from "../hooks/useNewsSources";
import { useGuardianAPI } from "../hooks/useGuardianApi";
import { useNewsAPI } from "../hooks/useNewsApi";

const MainView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedSource, setSelectedSource] = useState<string | undefined>();
  const [selectedCategory, setSelectedCategory] = useState<
    string | undefined
  >();
  const [selectedGuardianSource, setSelectedGuardianSource] = useState<
    string | undefined
  >();
  const [selectedGuardianCategory, setSelectedGuardianCategory] = useState<
    string | undefined
  >();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [tabIndex, setTabIndex] = useState<number>(0);

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

  const {
    articles: guardianArticlesData,
    sections: guardianSections,
    tags: guardianTags,
    isLoading: guardianLoading,
    isError: guardianError,
  } = useGuardianAPI({
    q: searchQuery || "general",
    section: selectedGuardianCategory,
    tag: selectedGuardianSource,
    page: currentPage,
    pageSize: 12,
  });

  const newsArticles = newsArticlesData?.articles;
  const guardianArticles = guardianArticlesData?.response.results;
  const totalResults =
    tabIndex === 0
      ? newsArticlesData?.totalResults || 0
      : guardianArticlesData?.response.total || 0;
  const totalPages = Math.ceil(totalResults / 12);

  const {
    data: sources,
    isLoading: sourcesLoading,
    isError: sourcesError,
  } = useNewsSources();

  const newsCategories = Array.from(
    new Set(sources?.map((source) => source.category) || []),
  );
  const newsSourceOptions =
    sources?.map((source) => ({ id: source.id, name: source.name })) || [];

  const handleSearch = (query: string) => setSearchQuery(query);

  const handleFilter = (
    type: "category" | "source",
    value: string | unknown,
  ) => {
    if (tabIndex === 0) {
      if (type === "category") {
        setSelectedCategory(value as string);
        const filteredSources = sources?.filter(
          (source) => source.category === value,
        );
        setSelectedSource(
          filteredSources?.map((source) => source.id).join(","),
        );
      } else if (type === "source") {
        setSelectedSource(value as string);
        setSelectedCategory(undefined);
      }
    } else {
      if (type === "category") {
        setSelectedGuardianCategory(value as string);
      } else if (type === "source") {
        setSelectedGuardianSource(value as string);
      }
    }
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurrentPage(value);
  };

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
                categories={
                  tabIndex === 0
                    ? newsCategories
                    : guardianSections?.map((section) => section.id) || []
                }
                sources={
                  tabIndex === 0
                    ? newsSourceOptions
                    : guardianTags?.map((tag) => ({
                        id: tag.id,
                        name: tag.webTitle,
                      })) || []
                }
                onFilter={handleFilter}
              />
            )}
          </Grid>
          <Grid item xs={12} md={9}>
            <Box sx={{ mb: 2 }}>
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
                  {newsArticles?.map((article: any) => (
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
                        description:
                          article.fields?.trailText ||
                          "No description available",
                        url: article.webUrl,
                        urlToImage: article.fields?.thumbnail || null,
                        publishedAt: article.webPublicationDate,
                        content: article.fields?.bodyText || "",
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
