import { Card, CardContent, Typography } from "@mui/material";
import Link from "next/link";

const ArticleCard = ({ id, title }) => {
  return (
    <Card variant="outlined" sx={{ borderRadius: 2, m: 1 }}>
      <CardContent>
        <Link href={`/article/${id}`}>
          <Typography variant="h5" level="title-md">
            {title}
          </Typography>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
