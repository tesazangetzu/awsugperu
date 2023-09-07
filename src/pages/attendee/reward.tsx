import * as React from "react";
import { useEffect, useState } from "react";
import { Layout } from "../../components/Layout";
import logoWhite from "../../images/logo-white.png";
import { Loader } from "../../components/Loader";

interface IFunAndConnect {
  feature_id: string;
  name: string;
  status: string;
  type: string;
}

const Reward = () => {
  const [fun, setFun] = useState<IFunAndConnect[]>();
  const [connect, setConnect] = useState<IFunAndConnect[]>();
  const [loader, setLoader] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`${process.env.API_URL}/me/rewards`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        });
        const res = await response.json();
        if (res.status) {
          setFun(res.data.fun);
          setConnect(res.data.connect);
          setLoader(false);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    getData();
  }, []);

  return (
    <Layout>
      {loader ? (
        <div className="container">
          <Loader
            open={loader}
            className="flex justify-center items-center hvh-custom"
          />
        </div>
      ) : (
        <section className="bg-reward-custom bg-no-repeat bg-cover h-full p-2 md:p-9">
          <div className="bg-white-trans-6 rounded-2xl p-4 sm:w-full md:w-4/5 lg:w-3/5 m-auto mb-3">
            <div>
              <div>
                <h3 className="text-xl">&lt; Have Fun /&gt;</h3>
              </div>
              <div className="hex-container">
                <div className="py-6 grid grid-cols-3">
                  {fun &&
                    fun.map((item, key) => (
                      <div
                        className={`hex ${
                          item.status !== "UNVISITED" ? "alter" : ""
                        }`}
                        key={key}
                      >
                        <span>{item.name}</span>
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
                {connect &&
                  connect.map((item, key) => (
                    <div
                      className={`circle flex justify-center items-center ${
                        item.status !== "UNVISITED" ? "white" : ""
                      }`}
                      key={key}
                    >
                      <span>{item.name}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center items-center">
            <img src={logoWhite} alt="logo" width={375} />
          </div>
        </section>
      )}
    </Layout>
  );
};

export default Reward;

export { Head } from "../index";
