import React from "react";
import {
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from "@mui/material";
import { StyledCard } from "./ArticleCard.styles";

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
}

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <StyledCard>
      <CardActionArea href={article.url} target="_blank">
        <CardMedia
          component="img"
          height="140"
          image={article.urlToImage || "https://via.placeholder.com/150"}
          alt={article.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {article.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {article.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </StyledCard>
  );
};

export default ArticleCard;
