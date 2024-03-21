"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import MDEditor from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { Box, Button, Container, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const EditArticle = ({ params }) => {
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
            `${id}` +
            "/edit",
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

  const handleForm = async (e) => {
    e.preventDefault();
    const data = {
      title,
      content,
    };
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}` +
          "/api/v1/articles/" +
          `${id}`,
        data,
        {
          headers: {
            uid: Cookies.get("uid"),
            client: Cookies.get("client"),
            "access-token": Cookies.get("access-token"),
          },
        }
      );

      if (!res) {
        throw new Error("記事の作成に失敗しました");
      }

      router.push("/mypage");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="title-container">
        <Container
          component="form"
          onSubmit={handleForm}
          maxWidth="lg"
          align="center"
        >
          <Box sx={{ mx: 2 }}>
            <TextField
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              id="title"
              label="タイトル"
              name="title"
              variant="standard"
              autoFocus
              required
              fullWidth
              sx={{ my: 2 }}
            />
            <div className="editor-container">
              <MDEditor
                value={content}
                onChange={(e) => setContent(e)}
                height="80vh"
                textareaProps={{
                  id: "content",
                  name: "content",
                  placeholder: "今日のTILを入力しましょう",
                }}
              />
              <Button
                endIcon={<SendIcon />}
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                更新
              </Button>
            </div>
          </Box>
        </Container>
      </div>
    </>
  );
};

export default EditArticle;
