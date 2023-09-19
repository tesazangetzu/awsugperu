import * as React from "react";
import { Link, type PageProps } from "gatsby";
import { Layout } from "../components/Layout";
import { UserIcon, LockClosedIcon } from "@heroicons/react/24/solid";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <section>
        <div className="container">
          <div className="w-3/5 md:w-96 m-auto text-center pt-10">
            <h2 className="mb-4">Bienvenido</h2>
            <div className="p-6 mb-8">
              <p>Comienza ahora</p>
            </div>
            <div className="[&>a]:flex [&>a]:p-3 [&>a]:m-2 [&>a]:w-4/5 [&>a]:mx-auto [&>a]:justify-center [&>a]:items-center [&>a]:border [&>a]:rounded-xl">
              <Link to="/login" className="hover:bg-black hover:text-white">
                <LockClosedIcon width={20} className="mr-2" />
                Admin
              </Link>
              <Link
                to="/attendee/welcome"
                className="hover:bg-black hover:text-white"
              >
                <UserIcon width={20} className="mr-2" />
                Asistente
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default IndexPage;

export const Head = () => <title>AWS UG Peru</title>;
