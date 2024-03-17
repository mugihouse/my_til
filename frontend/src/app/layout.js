import { Inter } from "next/font/google";
import "./globals.css";
import PageLayout from "@/components/page-layout";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { CssBaseline } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppRouterCacheProvider>
            <PageLayout>{children}</PageLayout>
          </AppRouterCacheProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
