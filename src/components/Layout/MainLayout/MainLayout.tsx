import React from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

type PropTypes = {
  children: JSX.Element;
};

function MainLayout(props: PropTypes) {
  const { children } = props;

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default MainLayout;
