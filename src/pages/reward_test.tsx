import * as React from "react";
import { Layout } from "../components/Layout";
import { HeadFC } from "gatsby";

const Reward = () => {
  const items = () => {
    const html = [];
    const cantItems = 7;
    for (let i = 0; i < cantItems; i++) {
      html.push(
        <article key={i}>
          <figure>
            <h2>@Xavisu</h2>
            <p>Hola, vengo a flotar. Front~end</p>
          </figure>
        </article>
      );
    }
    return html;
  };

  return (
    <Layout>
      <section>
        <div></div>
      </section>
    </Layout>
  );
};

export default Reward;

export const Head: HeadFC = () => <title>AWS Perú</title>;
