"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { NavBar } from "./navigation/desktop/nav-bar";

export const PageLayout = ({ children }) => {
  const { isLoading } = useUser;

  // if (isLoading) {
  //   return (
  //     <div>
  //       <PageLoader />
  //     </div>
  //   );
  // }

  return (
    <div className="page-layout">
      <NavBar />
      {/* <MobileNavBar /> */}
      <div className="page-layout__content">{children}</div>
      {/* <PageFooter /> */}
    </div>
  );
};
