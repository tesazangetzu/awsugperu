import * as React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Banner } from "./Banner";
import { HeadFC } from "gatsby";

export const Layout = ({ children }: any) => {
  return (
    <>
      <Header />
      <Banner />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export const Head: HeadFC = () => <title>AWS Perú</title>;
