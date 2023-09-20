import * as React from "react";
import { useEffect, useState } from "react";
import { Layout } from "../../components/Layout";
import logoWhite from "../../images/logo-white.png";
import { Loader } from "../../components/Loader";
import { LoginWithDni } from "../../components/LoginWithDni";
import localStorageCustom from "../../utils/localStorageCustom";
import { Button } from "../../components/Button";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";

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
  const [user, setUser] = useState<string | boolean>(false);
  const [status, setStatus] = useState<
    string | "INCOMPLETE" | "READY" | "COMPLETED"
  >();

  useEffect(() => {
    const getData = async () => {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (localStorageCustom("user"))
        headers.Authorization = `Bearer ${localStorageCustom("user")}`;

      try {
        const response = await fetch(`${process.env.API_URL}/me/rewards`, {
          headers,
        });
        const res = await response.json();
        if (res.status) {
          setFun(res.data.fun);
          setConnect(res.data.connect);
          setStatus(res.data.status);
          setUser(window.localStorage.getItem("user") ?? "");
          setLoader(false);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    if (localStorageCustom("user")) {
      getData();
    } else {
      setLoader(false);
    }
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
        <>
          {!user ? (
            <div className="container hvh-custom flex justify-center items-center">
              <LoginWithDni
                code={localStorage.getItem("code")}
                setLoader={setLoader}
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
                              item.status !== "UNVISITED" ? "" : "alter"
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
                  <div className="py-6 grid grid-cols-3 gap-3 m-auto sm:w-full md:w-4/5 lg:grid-cols-4 ">
                    {connect &&
                      connect.map((item, key) => (
                        <div
                          className={`circle flex justify-center items-center ${
                            item.status !== "UNVISITED" ? "" : "white"
                          }`}
                          key={key}
                        >
                          <span>{item.name}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              {status !== "INCOMPLETE" ? (
                <div className="flex justify-center">
                  <Button
                    text={
                      status === "READY"
                        ? "Puedes recoger tu premio"
                        : "Premio recogido"
                    }
                    level="fourth"
                  >
                    <CurrencyDollarIcon width={20} className="mr-2" />
                  </Button>
                </div>
              ) : (
                ""
              )}
              <div className="w-full flex justify-center items-center">
                <img src={logoWhite} alt="logo" width={375} />
              </div>
            </section>
          )}
        </>
      )}
    </Layout>
  );
};

export default Reward;

export { Head } from "../index";
