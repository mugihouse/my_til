"use client";

import { useEffect, useState } from "react";
import { Box, Container, Typography, IconButton, Table } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import Cookies from "js-cookie";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { cb } from "react-syntax-highlighter/dist/esm/styles/prism";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ShowArticle = ({ params }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { id } = params;

  const router = useRouter();

  useEffect(() => {
    const getArticleData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}` +
            "/api/v1/articles/" +
            `${id}`,
          {
            headers: {
              uid: Cookies.get("uid"),
              client: Cookies.get("client"),
              "access-token": Cookies.get("access-token"),
            },
          }
        );
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (error) {
        console.error(error);
      }
    };
    getArticleData();
  }, []);

  const Pre = ({ children, ...props }) => {
    if (!children || typeof children !== "object") {
      return <code {...props}>{children}</code>;
    }
    const childType = "type" in children ? children.type : "";
    if (childType !== "code") {
      return <code {...props}>{children}</code>;
    }

    const childProps = "props" in children ? children.props : {};
    const { className, children: code } = childProps;
    const language = className?.replace("language-", "");

    return (
      <SyntaxHighlighter language={language} style={cb} className="my-3">
        {String(code).replace(/\n$/, "")}
      </SyntaxHighlighter>
    );
  };

  const DeleteArticle = async () => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}` +
          "/api/v1/articles/" +
          `${id}`,
        {
          headers: {
            uid: Cookies.get("uid"),
            client: Cookies.get("client"),
            "access-token": Cookies.get("access-token"),
          },
        }
      );

      if (!res) {
        throw new Error("記事の削除に失敗しました");
      }

      router.push("/mypage");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Container component="main" maxWidth="md">
      <Box>
        <Box alignItems="center" sx={{ my: 4, px: 4, py: 4 }}>
          <Typography variant="h3" align="center">
            {title}
          </Typography>
        </Box>
        <Box
          my={1}
          flexDirection="row"
          justifyContent="flex-end"
          display="flex"
        >
          <Box>
            <IconButton component={Link} href={`/article/${id}/edit`}>
              <EditIcon />
            </IconButton>
          </Box>
          <Box>
            <IconButton onClick={() => DeleteArticle()}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
        <Box sx={{ px: 4, py: 4 }}>
          <Markdown
            rehypePlugins={[rehypeRaw, rehypeSanitize]}
            remarkPlugins={[remarkGfm, remarkBreaks]}
            className="markdown"
            components={{
              pre: Pre,
              h1: ({ children }) => (
                <Typography variant="h1" gutterBottom>
                  {children}
                </Typography>
              ),
              h2: ({ children }) => (
                <Typography variant="h2" gutterBottom>
                  {children}
                </Typography>
              ),
              h3: ({ children }) => (
                <Typography variant="h3" gutterBottom>
                  {children}
                </Typography>
              ),
              h4: ({ children }) => (
                <Typography variant="h4" gutterBottom>
                  {children}
                </Typography>
              ),
              h5: ({ children }) => (
                <Typography variant="h5" gutterBottom>
                  {children}
                </Typography>
              ),
              h6: ({ children }) => (
                <Typography variant="h6" gutterBottom>
                  {children}
                </Typography>
              ),
              p: ({ children }) => (
                <p style={{ marginBottom: "1em" }}>{children}</p>
              ),
            }}
          >
            {content}
          </Markdown>
        </Box>
      </Box>
    </Container>
  );
};

export default ShowArticle;
