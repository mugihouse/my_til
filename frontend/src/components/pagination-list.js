"use client";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const PaginationList = ({ pagination, setArticles, setPagination }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { total_count, total_pages, limit_value } = pagination;

  const router = useRouter();

  const handleChange = (e, value) => {
    const paged = value;
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
        setCurrentPage(value);
        router.push(`/?paged=${currentPage}`);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  };
  return (
    <Stack spacing={2}>
      <Pagination
        count={total_pages}
        page={currentPage}
        onChange={handleChange}
        hidePrevButton
        hideNextButton
      />
    </Stack>
  );
};

export default PaginationList;
