"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import MDEditor from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import Cookies from "js-cookie";
import { Box, Button, Container, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const NewArticle = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const router = useRouter();

  const handleForm = async (e) => {
    e.preventDefault();
    const data = {
      title,
      content,
    };
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}` + "/api/v1/articles",
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
                送信
              </Button>
            </div>
          </Box>
        </Container>
      </div>
    </>
  );
};

export default NewArticle;
