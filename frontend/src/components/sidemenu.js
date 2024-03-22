import Link from "next/link";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { useRouter } from "next/navigation";

const Sidemenu = ({ open, setOpen }) => {
  const router = useRouter();

  const ToIndexArticle = () => {
    router.push("/article/index");
    setOpen(!open);
  };
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
      <ListItemButton onClick={() => ToIndexArticle()}>
        <ListItemIcon>
          <ArticleOutlinedIcon />
        </ListItemIcon>
        Index Article
      </ListItemButton>
      <ListItemButton>
        <ListItemText primary="Drafts" />
      </ListItemButton>
    </List>
  );
};

export default Sidemenu;
