import * as React from "react";
import { useState } from "react";
import { renderErrorMessage } from "../utils/renderErrorMessage";

interface ILoginWithDni {
  code: string | null;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoginWithDni = ({ code, setLoader }: ILoginWithDni) => {
  const [dni, setDni] = useState<string>();
  const [error, setError] = useState<string>();

  const handleSubmit = async (): Promise<void> => {
    const login = async () => {
      try {
        const response = await fetch(`${process.env.API_URL}/login`, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            username: code,
            password: dni,
          }),
        });
        const res = await response.json();
        if (!res.status) {
          setLoader(false);
          setError(res.message);
        } else {
          window.localStorage.setItem("user", res.data);
          window.location.reload();
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    login();
  };

  return (
    <div className="w-4/5 md:w-1/2 lg:w-1/4 m-auto p-5 border rounded-md">
      <div>
        <div className="flex justify-between items-center mb-8  ">
          <h2 className="text-lg">Vincula tu DNI</h2>
        </div>
      </div>
      <div className="p-3">
        <div className="p-3 rounded-md bg-gray-100 mb-3">
          <label htmlFor="" className="text-sm">
            DNI
          </label>
          <input
            type="number"
            className="border w-full mt-2 p-2"
            onChange={(e) => setDni(e.target.value)}
          />
          {error ? renderErrorMessage(error) : ""}
        </div>
        <button
          className="block border rounded-2xl bg-gradient-custom text-white text-sm text-center px-4 py-2 shadow-md w-32 hover:bg-black m-auto"
          onClick={() => handleSubmit()}
        >
          Vincular
        </button>
      </div>
    </div>
  );
};
