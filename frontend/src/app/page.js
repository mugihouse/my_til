"use client";

import PaginationList from "@/components/pagination-list";
import ArticleCard from "@/components/article-card";
import { Box, Container } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const TopPage = (context) => {
  const [articles, setArticles] = useState([]);
  const [pagination, setPagination] = useState([]);

  useEffect(() => {
    // 指定がない時は1ページ目から
    const paged = context.searchParams.paged ?? 1;
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}` +
            "/api/v1/articles?paged=" +
            `${paged}`,
          {
            headers: {
              uid: Cookies.get("uid"),
              client: Cookies.get("client"),
              "access-token": Cookies.get("access-token"),
            },
          }
        );
        setArticles(res.data.articles);
        setPagination(res.data.pagination[0]);
        // console.log(res.data.pagination[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
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
              name={item.name}
            />
          ))}
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            mt: 3,
          }}
        >
          <Box m="auto">
            <PaginationList
              pagination={pagination}
              setArticles={setArticles}
              setPagination={setPagination}
            />
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default TopPage;
