import * as React from "react";
import { Link, HeadFC, PageProps } from "gatsby";
import { Layout } from "../components/Layout";
import llamita404 from "../images/llama-404.png";

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <section>
        <div className="container">
          <div className="text-center py-16 w-full md:w-2/4 m-auto">
            <h1 className="mb-3">Pagina no encontrada</h1>
            <p>
              Lo sentimos 😔, no pudimos encontrar lo que buscabas.
              <br />
              <img src={llamita404} alt="404" />
              <br />
              <Link to="/" className="text-2xl">
                404
              </Link>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFoundPage;

export const Head: HeadFC = () => <title>Not found</title>;
