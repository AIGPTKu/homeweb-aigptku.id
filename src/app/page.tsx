import { Suspense } from "react";

const Home: React.FC = ({ children }: any) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
          color: "white",
        }}
      >
        <img
          src="/aigptku.id-white.png"
          alt=""
          style={{
            width: "50vw",
            maxWidth: 200,
          }}
        />
        <h1>Soon!</h1>
      </div>
    </Suspense>
  );
};

export default Home;
