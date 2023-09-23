import React, { useState } from "react";
import { TrashIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Button } from "../Button";
import localStorageCustom from "../../utils/localStorageCustom";
import { RenderMessage } from "../RenderMessage";
import { navigate } from "gatsby";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
}

const ModalDeleteUser: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  username,
}) => {
  const [error, setError] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${process.env.API_URL}/users/${username}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorageCustom("user")}`,
        },
      });
      const res = await response.json();

      if (!res.status) {
        setError(true);
        setMsg(res.message);
      } else {
        setMsg("Voluntario eliminado");
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
          <TrashIcon width={200} className="text-red-500 m-auto mb-4" />
          <p className="text-center mb-4">
            ¿Estas seguro de eliminar a{" "}
            <span className="font-bold">{username}</span>?
          </p>
          <div className="flex justify-around items-center mb-3">
            <Button text="Eliminar" onClick={handleSubmit}>
              <TrashIcon width={20} className="mr-2" />
            </Button>
            <Button text="Cancelar" level="second" onClick={onClose} />
          </div>
          <RenderMessage message={msg} error={error} />
        </div>
      </div>
    </div>
  ) : null;
};

export default ModalDeleteUser;
