import * as React from "react";
import { Layout } from "../../components/Layout";
import { HeadFC, Link } from "gatsby";

const Register = () => {
  return (
    <Layout>
      <section className="py-12">
        <div className="w-4/5 md:w-2/4 m-auto p-5 border rounded-md">
          <div>
            <div className="flex justify-between items-center mb-8  ">
              <h2 className="text-lg"> Event Profile</h2>
              <Link
                to="/attendee/3a575ea7-56e5-434a-a1fc-f0e702bca17e"
                className="border rounded-full text-xs bg-gradient-custom text-white px-3 py-1 shadow-md hover:bg-black"
              >
                Link
              </Link>
            </div>
          </div>
          <div className="p-3">
            <div className="p-3 rounded-md bg-gray-100">
              <label htmlFor="" className="text-sm">
                Enter Credencial ID / DNI
              </label>
              <input type="number" className="border w-full mt-2" />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Register;

export const Head: HeadFC = () => <title>AWS Perú</title>;
