import * as React from "react";
import { Link, type HeadFC, type PageProps } from "gatsby";
import { Layout } from "../components/Layout";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <section>
        <div className="container">
          <div className="w-3/5 md:w-96 m-auto text-center pt-10">
            <h2 className="mb-4">Bienvenido</h2>
            <div className="border rounded-xl p-6 mb-8">
              <p>Comienza ahora</p>
            </div>
            <div className="[&>a]:block [&>a]:p-3 [&>a]:m-2 [&>a]:border [&>a]:rounded-md [&>a]:w-4/5 [&>a]:mx-auto">
              <Link
                to="/admin/login"
                className="hover:bg-black hover:text-white"
              >
                Admin
              </Link>
              <Link to="" className="hover:bg-black hover:text-white">
                Attendee
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>AWS Perú</title>;
