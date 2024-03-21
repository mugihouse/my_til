import Link from "next/link";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";

const Sidemenu = () => {
  return (
    <List
      sx={{ width: 250, bgcolor: "background" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Menu List
        </ListSubheader>
      }
    >
      <ListItemButton>
        <ListItemIcon>
          <ArticleOutlinedIcon />
        </ListItemIcon>
        <Link href="/article/index">Index Article</Link>
      </ListItemButton>
      <ListItemButton>
        <ListItemText primary="Drafts" />
      </ListItemButton>
    </List>
  );
};

export default Sidemenu;
