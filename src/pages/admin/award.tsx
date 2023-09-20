import * as React from "react";
import { useState } from "react";
import { QrReader } from "react-qr-reader";
import { Layout } from "../../components/Layout";
import { renderErrorMessage } from "../../utils/renderErrorMessage";
import { CameraIcon } from "@heroicons/react/24/solid";
import localStorageCustom from "../../utils/localStorageCustom";
import ModalAward from "../../components/ModalAward";
import { navigate } from "gatsby";
import MiddlewareAdminRoute from "../../components/middlewares/MiddlewareAdminRoute";

const Award = () => {
  const [selectedCam, setSelectedCam] = useState<string>("environment");
  const [startScan, setStartScan] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${process.env.API_URL}/rewards/status`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorageCustom("user")}`,
        },
        body: JSON.stringify({ code, event: process.env.EVENT_ID }),
      });
      const res = await response.json();

      if (!res.status) {
        setError(res.message);
      } else {
        localStorage.setItem("code", code);
        setCode("");
        setIsModalOpen(!isModalOpen);
        navigate("/admin/success");
      }
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  return (
    <Layout>
      <MiddlewareAdminRoute>
        <section>
          <div className="container">
            <div className="py-8">
              <button
                className="px-5 py-2 border rounded-md m-auto hover:bg-black hover:text-white mb-6 flex"
                onClick={() => setStartScan(!startScan)}
              >
                <CameraIcon width={22} className="mr-3" />
                {startScan ? "Desactivar Camara" : "Activar Camara"}
              </button>
              {startScan && (
                <>
                  <select
                    className="block m-auto"
                    onChange={(e) => setSelectedCam(e.target.value)}
                  >
                    <option value={"environment"}>Back Camera</option>
                    <option value={"user"}>Front Camera</option>
                  </select>
                  <QrReader
                    constraints={{ facingMode: selectedCam }}
                    onResult={(result) => {
                      if (result) {
                        const arr = result?.getText().split("/");
                        const code = arr[arr.length - 1];
                        if (code.trim()) {
                          setCode(code);
                          setStartScan(!startScan);
                          setIsModalOpen(!isModalOpen);
                        } else {
                          setError("Code not found");
                        }
                      }
                    }}
                    className="sm:w-4/5 py-3 m-auto lg:w-2/4"
                  />
                  {error ? (
                    <div className="w-full flex justify-center">
                      {renderErrorMessage(error)}
                    </div>
                  ) : (
                    ""
                  )}
                </>
              )}
              <ModalAward
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(!isModalOpen)}
                handleSubmit={handleSubmit}
              ></ModalAward>
            </div>
          </div>
        </section>
      </MiddlewareAdminRoute>
    </Layout>
  );
};

export default Award;

export { Head } from "./login";
