import * as React from "react";
import { useState, useEffect } from "react";
import { Layout } from "../../components/Layout";
import { Loader } from "../../components/Loader";
import { renderErrorMessage } from "../../utils/renderErrorMessage";

interface IParams {
  id: string;
}
interface IUser {
  company: string;
  first_name: string;
  last_name: string;
}

const Attendee = ({ params }: { params: IParams }) => {
  const [user, setUser] = useState<IUser>();
  const [qr, setQr] = useState<string>();
  const [loader, setLoader] = useState<boolean>(true);
  const [dni, setDni] = useState<string>();
  const [error, setError] = useState<string>();

  const handleSubmit = async () => {
    const login = async () => {
      try {
        const response = await fetch(`${process.env.API_URL}/login`, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            username: params.id,
            password: dni,
          }),
        });
        const res = await response.json();
        if (!res.status) {
          setLoader(false);
          setError(res.message);
        } else {
          window.localStorage.setItem("user", res.data);
          window.localStorage.setItem("attendee", params.id);
          window.location.reload();
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    login();
  };

  const handleLink = () => {
    setLoader(true);

    const link = async () => {
      try {
        const response = await fetch(
          `${process.env.API_URL}/codes/${params.id}`,
          {
            method: "PATCH",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
              person: dni,
              event: process.env.EVENT_ID,
            }),
          }
        );
        const res = await response.json();
        if (!res.status) {
          setLoader(false);
          setError(res.message);
        } else {
          handleSubmit();
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    link();
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `${process.env.API_URL}/codes/${params.id}`
        );
        const res = await response.json();
        if (res.status) {
          setQr(res.data.image);
          setUser(res.data.person);
          localStorage.setItem("code", res.data.id);
          setLoader(false);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    getData();
  }, [params.id]);

  return (
    <Layout>
      <section className="py-12">
        {loader ? (
          <Loader
            open={loader}
            className="flex justify-center items-center hvh-custom"
          />
        ) : (
          <>
            {!user ? (
              <div className="w-4/5 md:w-1/2 lg:w-1/4 m-auto p-5 border rounded-md">
                <div>
                  <div className="flex justify-between items-center mb-8  ">
                    <h2 className="text-lg"> Event Profile</h2>
                  </div>
                </div>
                <div className="p-3">
                  <div className="p-3 rounded-md bg-gray-100 mb-3">
                    <label htmlFor="" className="text-sm">
                      Enter Credencial ID / DNI
                    </label>
                    <input
                      type="number"
                      className="border w-full mt-2"
                      onChange={(e) => setDni(e.target.value)}
                    />
                    {error ? renderErrorMessage(error) : ""}
                  </div>
                  <button
                    className="block border rounded-xl bg-gradient-custom text-white text-sm text-center px-3 py-1 shadow-md w-32 hover:bg-black m-auto"
                    onClick={() => handleLink()}
                  >
                    Vincular
                  </button>
                </div>
              </div>
            ) : (
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
                    <p>
                      {user?.first_name.charAt(0)}
                      {user?.last_name.charAt(0)}
                    </p>
                  </div>
                  <div className="[&>div>small]:block [&>div>span]:font-bold [&>div]:mb-2 text-sm">
                    <div className="border-b-2 pb-2">
                      <small>First Name</small>
                      <span>{user?.first_name}</span>
                    </div>
                    <div className="border-b-2 pb-2">
                      <small>Last Name</small>
                      <span>{user?.last_name}</span>
                    </div>
                    <div>
                      <small>Company Name</small>
                      <span>{user?.company}</span>
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-xs text-center mb-2">Check in QR Code</p>
                  <div className="md:w-[196px] p-2 border-4 border-black rounded-2xl m-auto sm:w-full">
                    <img
                      className="md:w-[180px] lg:w-[200px] sm:w-full"
                      src={qr}
                      alt="qr"
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </Layout>
  );
};

export default Attendee;

export { Head } from "../index";
