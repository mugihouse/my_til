"use client";

import ArticleCard from "@/components/article-card";
import { Box, Container } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const IndexArticles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}` + "/api/v1/articles",
          {
            headers: {
              uid: Cookies.get("uid"),
              client: Cookies.get("client"),
              "access-token": Cookies.get("access-token"),
            },
          }
        );
        setArticles(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  return (
    <Container align="center">
      <Box
        sx={{
          width: "100%",
          maxWidth: 700,
          display: "grid",
          mt: 3,
        }}
      >
        {articles.map((item) => (
          <ArticleCard
            key={item.id}
            id={item.id}
            title={item.title}
            content={item.content}
          />
        ))}
      </Box>
    </Container>
  );
};

export default IndexArticles;
