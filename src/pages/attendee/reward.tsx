import * as React from "react";
import { Layout } from "../../components/Layout";
import logoWhite from "../../images/logo-white.png";

const Reward = () => {
  const items = [
    "Element 1",
    "Element 2",
    "Element 3",
    "Element 4",
    "Element 5",
    "Element 6",
    "Element 7",
    "Element 8",
  ];

  return (
    <Layout>
      <section className="bg-reward-custom bg-no-repeat bg-cover h-full p-2 md:p-9">
        <div className="bg-white-trans-6 rounded-2xl p-4 sm:w-full md:w-4/5 lg:w-3/5 m-auto mb-3">
          <div>
            <div>
              <h3 className="text-xl">&lt; Have Fun /&gt;</h3>
            </div>
            <div className="hex-container">
              <div className="py-6 grid grid-cols-3">
                {items.map((item, key) => (
                  <div className={`hex ${key === 2 ? "alter" : ""}`}>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div>
              <h3 className="text-xl text-right">&lt; Connect /&gt;</h3>
            </div>
            <div className="py-6 grid grid-cols-3 gap-3 sm:w-full lg:grid-cols-4 md:w-3/5 m-auto">
              {items.map((item, key) => {
                return (
                  <div
                    className={`circle flex justify-center items-center ${
                      key === 2 ? " white" : ""
                    }`}
                  >
                    <span>{item}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <img src={logoWhite} alt="logo" width={375} />
        </div>
      </section>
    </Layout>
  );
};

export default Reward;

export { Head } from "../index";
