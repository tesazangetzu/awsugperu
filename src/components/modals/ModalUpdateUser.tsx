import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Button } from "../Button";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { renderErrorMessage } from "../../utils/renderErrorMessage";
import * as Yup from "yup";
import { RenderMessage } from "../RenderMessage";
import localStorageCustom from "../../utils/localStorageCustom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
}

const validationSchema = Yup.object().shape({
  password: Yup.string().required("Contraseña es querida"),
});

const ModalUpdateUser: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  username,
}) => {
  const [error, setError] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");

  const handleSubmit = async (values: { password: string }) => {
    try {
      const response = await fetch(`${process.env.API_URL}/users/${username}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorageCustom("user")}`,
        },
        body: JSON.stringify(values),
      });
      const res = await response.json();

      if (!res.status) {
        setError(true);
        setMsg(res.message);
      } else {
        setError(false);
        setMsg("Constraseña actualizada");
        setTimeout(() => {
          setMsg("");
          onClose();
        }, 2500);
      }
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/25">
      <div className="modal-overlay"></div>
      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-2xl z-50 overflow-y-auto">
        <div className="modal-close p-2 text-right">
          <button onClick={onClose}>
            <XMarkIcon width={18} className="ml-auto mr-0" />
          </button>
        </div>
        <div className="modal-content py-3 text-left px-6">
          <h1 className="text-center mb-6 text-lg">
            Editar usuario <span className="text-blue-400">{username}</span>
          </h1>
          <Formik
            initialValues={{ password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, handleChange }) => (
              <Form className="px-4 mb-3">
                <div className="mb-6">
                  <div className="flex items-center justify-between">
                    <label
                      className="text-sm ff-cg--semibold"
                      htmlFor="password"
                    >
                      Cambiar contraseña:
                    </label>
                  </div>
                  <Field
                    className={`w-full bg-gray-100 placeholder:text-[#000000] p-[10px] focus:outline-none rounded-xl mt-2 ${
                      errors.password ? "border border-red-500" : ""
                    }`}
                    id="password"
                    name="password"
                    type="password"
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    name="password"
                    render={(msg: string) => renderErrorMessage(msg)}
                  />
                </div>
                <div className="flex justify-between">
                  <Button text="Actualizar" />
                  <Button text="Cancelar" level="second" onClick={onClose} />
                </div>
              </Form>
            )}
          </Formik>
          <RenderMessage message={msg} error={error} />
        </div>
      </div>
    </div>
  ) : null;
};

export default ModalUpdateUser;
