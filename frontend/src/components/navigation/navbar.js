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

const NavBar = () => {
  const [open, setOpen] = useState(false);
  // サイドメニュー開閉処理
  const toggleDrawer = () => {
    setOpen(!open);
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
        </Toolbar>
      </AppBar>
      <Drawer open={open} onClose={toggleDrawer}>
        <Sidemenu open={open} setOpen={setOpen} />
      </Drawer>
    </Box>
  );
};

export default NavBar;
