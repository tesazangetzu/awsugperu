import * as React from "react";
import { type PageProps } from "gatsby";
import { Layout } from "../../components/Layout";
import { UserIcon } from "@heroicons/react/24/solid";

const Login: React.FC<PageProps> = () => {
  return (
    <Layout>
      <section>
        <div className="container">
          <div className="sm:w-4/5 md:w-96 m-auto text-center pt-10">
            <h2 className="mb-4">Admin re:wards</h2>
            <div className="flex justify-center items-center mb-4">
              <UserIcon width={150} />
            </div>

            <div className="mb-4">
              <div>
                <label htmlFor="">User</label>
                <input type="text" />
              </div>
              <div>
                <label htmlFor="">Pass</label>
                <input type="password" />
              </div>
            </div>
            <button className="flex justify-center p-3 m-2 border rounded-md w-36 mx-auto hover:bg-black hover:text-white text-center">
              Login
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Login;
