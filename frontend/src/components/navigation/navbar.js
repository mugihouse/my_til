import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";

const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MY TIL
          </Typography>
          <Button color="inherit">
            <Link href="/login">LOGIN</Link>
          </Button>
          <Button color="inherit">
            <Link href="/sign-up">SIGNUP</Link>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
