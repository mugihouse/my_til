import NavBar from "./navigation/navbar";

const PageLayout = ({ children }) => {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
};

export default PageLayout;
