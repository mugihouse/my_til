import { withAuthServerSideProps } from "../../../lib/auth";

const Mypage = () => {
  withAuthServerSideProps("/api/v1/mypage");
  return (
    <>
      <div>
        <main>
          <h1>My page</h1>
          <p>認証されました</p>
        </main>
      </div>
    </>
  );
};

export default Mypage;
