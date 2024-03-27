import { Box, Card, CardContent, Typography, Link } from "@mui/material";

const ArticleCard = ({ id, title, name }) => {
  return (
    <Card variant="outlined" sx={{ borderRadius: 2, m: 1, px: 5, py: 3 }}>
      <CardContent>
        <Box className="article-author" textAlign="left">
          <Typography gutterBottom>{name}</Typography>
        </Box>
        <Box className="article-title" textAlign="left">
          <Link href={`/article/${id}`} color="inherit">
            <Typography variant="h5" level="title-md">
              {title}
            </Typography>
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
