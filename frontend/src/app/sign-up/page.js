"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Alert,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material/";
import axios from "axios";
import Cookies from "js-cookie";
import { mutate } from "swr";

const SignUp = () => {
  const router = useRouter();
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const axiosInstance = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/`,
      headers: {
        "content-type": "application/json",
      },
    });
    (async () => {
      setIsError(false);
      setErrorMessage("");
      return await axiosInstance
        .post("auth", {
          name: data.get("name"),
          email: data.get("email"),
          password: data.get("password"),
          password_confirmation: data.get("password_confirmation"),
        })
        .then(function (response) {
          // Cookieにトークンをセットしています
          Cookies.set("uid", response.headers["uid"]);
          Cookies.set("client", response.headers["client"]);
          Cookies.set("access-token", response.headers["access-token"]);
          Cookies.set("name", response.data.data.name);
          router.push("/mypage");
          mutate(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}` + "/api/v1/authenticate"
          );
        })
        .catch(function (error) {
          // Cookieからトークンを削除しています
          Cookies.remove("uid");
          Cookies.remove("client");
          Cookies.remove("access-token");
          Cookies.remove("name");
          setIsError(true);
          setErrorMessage(error.response.data.errors[0]);
        });
    })();
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box>
        <Typography
          component="h1"
          variant="h5"
          align="center"
          sx={{ pt: 3, mp: 2 }}
        >
          新規登録
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pb: 4,
          }}
        >
          <TextField
            id="name"
            label="名前"
            name="name"
            variant="standard"
            autoFocus
            required
            fullWidth
          />
          <TextField
            id="email"
            label="メールアドレス"
            name="email"
            autoComplete="email"
            variant="standard"
            autoFocus
            required
            fullWidth
          />
          <TextField
            name="password"
            label="パスワード"
            type="password"
            id="password"
            autoComplete="current-password"
            variant="standard"
            required
            fullWidth
          />
          <TextField
            name="password_confirmation"
            label="パスワード（確認用）"
            type="password"
            id="password_confirmation"
            variant="standard"
            autoComplete="current-password"
            required
            fullWidth
          />
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            登録
          </Button>
          {isError ? (
            <Alert
              onClose={() => {
                setIsError(false);
                setErrorMessage("");
              }}
              severity="error"
            >
              {errorMessage}
            </Alert>
          ) : null}
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
