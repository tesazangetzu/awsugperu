import * as React from "react";
import { Layout } from "../../components/Layout";
import { HeadFC } from "gatsby";

const Attendee = ({ params }: any) => {
  return (
    <Layout>
      <section className="py-12">
        <div className="w-4/5 md:w-2/4 m-auto p-5 border rounded-md lg:flex lg:justify-between lg:items-center">
          <div className="lg:w-2/4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg"> Event Profile</h2>
              <button
                className="border rounded-full text-xs bg-zinc-500 text-zinc-300 px-3 py-1 shadow-md"
                disabled
              >
                Linked
              </button>
            </div>
            <div className="w-12 h-12 bg-blue-950 text-white uppercase p-3 mb-4">
              <p>UM</p>
            </div>
            <div className="[&>div>small]:block [&>div>span]:font-bold [&>div]:mb-2 text-sm">
              <div className="border-b-2 pb-2">
                <small>First Name</small>
                <span>Umar Alhassan</span>
              </div>
              <div className="border-b-2 pb-2">
                <small>Last Name</small>
                <span>Mohammed</span>
              </div>
              <div>
                <small>Company Name</small>
                <span>HarmTech Solution Limited</span>
              </div>
            </div>
          </div>
          <div className="p-3">
            <p className="text-xs text-center mb-2">Check in QR Code</p>
            <div className="md:w-[196px] p-2 border-4 border-black rounded-2xl m-auto sm:w-full">
              <img
                className="md:w-[180px] lg:w-[200px] sm:w-full"
                src="https://dev.cdn.reconecta.cloud/92e390db-545d-4e03-bb97-199314e7bbd4/3a575ea7-56e5-434a-a1fc-f0e702bca17e"
                alt="qr"
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Attendee;

export { Head } from "../index";
