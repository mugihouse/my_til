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

const SignUp = () => {
  const defaultValues = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const router = useRouter();
  const [isError, setIsError] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const onSubmit = (formData) => {
    const axiosInstance = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/`,
      headers: {
        "content-type": "application/json",
      },
    });
    (async () => {
      setIsError(false);
      setErrorMessages("");
      return await axiosInstance
        .post("auth", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.password_confirmation,
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
          setErrorMessages(error.response.data.errors.full_messages);
          console.log(error.response.data.errors.full_messages);
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
          新規登録
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
                  setErrorMessages("");
                }}
                severity="error"
              >
                {errorMessages.map((item) => (
                  <div key={item}>・{item}</div>
                ))}
              </Alert>
            ) : null}
          </Box>
          <TextField
            id="name"
            label="名前"
            name="name"
            variant="standard"
            autoFocus
            fullWidth
            {...register("name", {
              required: "名前は必須です",
            })}
            sx={{ mb: 2 }}
            error={"name" in errors}
            helperText={errors.name?.message}
          />
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
            {...register("password", {
              required: "パスワードは必須です",
            })}
            sx={{ mb: 2 }}
            error={"password" in errors}
            helperText={errors.password?.message}
          />
          <TextField
            name="password_confirmation"
            label="パスワード（確認用）"
            type="password"
            id="password_confirmation"
            variant="standard"
            autoComplete="current-password"
            fullWidth
            {...register("password_confirmation", {
              required: "パスワード（確認用）は必須です",
            })}
            sx={{ mb: 2 }}
            error={"password_confirmation" in errors}
            helperText={errors.password_confirmation?.message}
          />
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            登録
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
