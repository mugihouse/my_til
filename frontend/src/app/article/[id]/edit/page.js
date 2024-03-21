"use client";

import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { Box, Button, Container, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const EditArticle = () => {
  const [content, setContent] = useState("");

  return (
    <>
      <div className="title-container">
        <Container component="form" maxWidth="lg" align="center">
          <Box sx={{ mx: 2 }}>
            <TextField
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

export default EditArticle;
