"use client";

import { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import Sidemenu from "../sidemenu";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const NavBar = () => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  // サイドメニュー開閉処理
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleSignOutClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}` + "/api/v1/auth/sign_out",
        {
          headers: {
            uid: Cookies.get("uid"),
            client: Cookies.get("client"),
            "access-token": Cookies.get("access-token"),
          },
        }
      );
      Cookies.remove("uid");
      Cookies.remove("client");
      Cookies.remove("access-token");
      router.push("/");
    } catch (err) {
      console.error(err);
      alert(err.response.data.errors);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={toggleDrawer}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/">MY TIL</Link>
          </Typography>
          <Button color="inherit">
            <Link href="/login">LOGIN</Link>
          </Button>
          <Button color="inherit">
            <Link href="/sign-up">SIGNUP</Link>
          </Button>
          <Button color="inherit">
            <Link href="/article/new">New Article</Link>
          </Button>
          <Button color="inherit">
            <Link href="/mypage">My Page</Link>
          </Button>
          <Button color="inherit" onClick={handleSignOutClick}>
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer open={open} onClose={toggleDrawer}>
        <Sidemenu open={open} setOpen={setOpen} />
      </Drawer>
    </Box>
  );
};

export default NavBar;
