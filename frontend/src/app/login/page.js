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
import { useForm } from "react-hook-form";

const Login = () => {
  const defaultValues = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const router = useRouter();
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = (formData) => {
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
          email: formData.email,
          password: formData.password,
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

  const onerror = (err) => console.log(err);

  return (
    <Container component="main" maxWidth="sm">
      <Box sx={{ pl: 2, pr: 2 }}>
        <Typography
          component="h1"
          variant="h5"
          align="center"
          sx={{ pt: 6, mp: 2 }}
        >
          ログイン
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit, onerror)}
          sx={{
            mt: 6,
            pb: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ mb: 4 }}>
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
          <TextField
            id="email"
            label="メールアドレス"
            name="email"
            autoComplete="email"
            variant="standard"
            autoFocus
            fullWidth
            {...register("email", {
              required: "メールアドレスは必須です",
            })}
            sx={{ mb: 2 }}
            error={"email" in errors}
            helperText={errors.email?.message}
          />
          <TextField
            name="password"
            label="パスワード"
            type="password"
            id="password"
            autoComplete="current-password"
            variant="standard"
            fullWidth
            sx={{ mb: 2 }}
            {...register("password", {
              required: "パスワードは必須です",
            })}
            error={"password" in errors}
            helperText={errors.password?.message}
          />
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            ログイン
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
