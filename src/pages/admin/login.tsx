import * as React from "react";
import { type HeadFC, type PageProps } from "gatsby";
import { Layout } from "../../components/Layout";
import { UserIcon } from "@heroicons/react/24/solid";

const Login: React.FC<PageProps> = () => {
  return (
    <Layout>
      <section>
        <div className="container">
          <div className="sm:w-4/5 md:w-96 m-auto text-center pt-10">
            <h2 className="mb-4">Admin re:wards</h2>

            <div>
              <UserIcon />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Login;

export const Head: HeadFC = () => <title>AWS Admin</title>;
