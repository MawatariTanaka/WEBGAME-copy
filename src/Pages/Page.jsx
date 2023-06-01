import React, { useContext } from "react";
import Header from "../Components/Header";
import { AppContext } from "../Contexts/AppContext";

const Page = () => {
  const { modeStyle } = useContext(AppContext);
  return (
    <div
      style={{
        ...modeStyle,
        minHeight: '100vh',
      }}
    >
      <Header />
    </div>
  );
};

export default Page;
