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

const Login = () => {
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
        .post("auth/sign_in", {
          email: data.get("email"),
          password: data.get("password"),
        })
        .then(function (response) {
          // Cookieにトークンをセットしています
          Cookies.set("uid", response.headers["uid"]);
          Cookies.set("client", response.headers["client"]);
          Cookies.set("access-token", response.headers["access-token"]);
          Cookies.set("name", response.data.data.name);
          router.push("/mypage");
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
          ログイン
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
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            ログイン
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

export default Login;
