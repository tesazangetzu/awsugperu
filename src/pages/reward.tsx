import * as React from "react";
import { Layout } from "../components/Layout";
import { HeadFC } from "gatsby";
import logoWhite from "../images/logo-white.png";

const Reward = () => {
  const items = [
    "Element 1",
    "Element 2",
    "Element 3",
    "Element 4",
    "Element 5",
    "Element 6",
    "Element 7",
  ];
  const objects = [{}];

  const renderHexagons = () => {
    let hexagons = ``;
    let row = 0;
    let count = 0;
    let temp = ``;
    items.forEach((item, key) => {
      temp += `<div className="hexagon flex justify-center items-center p-1 m-2">${item}</div>`;
      count++;
      if (row === 0 && count === 3) {
        hexagons += `<div key="wrapper-3-${key}" className="wrapper-div-for-3">${temp}</div>`;
        row = 1;
        count = 0;
      }
      if (row === 1 && count === 2) {
        hexagons += `<div key="wrapper-2-${key}" className="wrapper-div-for-2">${temp}</div>`;
        row = 0;
        count = 0;
      }
    });
    return hexagons;
  };

  return (
    <Layout>
      <section className="bg-reward-custom bg-no-repeat bg-cover h-full p-9">
        <div className="bg-white-trans-6 rounded-2xl p-4 sm:w-full md:w-4/5 m-auto mb-3">
          <div>
            <div>
              <h3 className="text-xl">&lt; Have Fun /&gt;</h3>
            </div>
            <div className="py-6 grid grid-cols-3">
              {items.map((item) => {
                return (
                  <div className="hexagon flex justify-center items-center p-1 m-2">
                    {item}
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <div>
              <h3 className="text-xl text-right">&lt; Connect /&gt;</h3>
            </div>
            <div className="py-6 flex flex-wrap">
              {items.map((item, key) => {
                return (
                  <div
                    className={`circle flex justify-center items-center ${
                      key === 3 ? " white" : ""
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

export const Head: HeadFC = () => <title>AWS Perú</title>;
