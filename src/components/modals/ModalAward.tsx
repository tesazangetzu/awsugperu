import React from "react";
import { GiftIcon, XMarkIcon } from "@heroicons/react/24/solid";
import llamita from "../../images/llama-404.png";
import { Button } from "../Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleSubmit: any;
}

const ModalAward: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  handleSubmit,
}) => {
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
          <img src={llamita} alt="modal-award" />
          <p className="text-center mb-3">
            ¿Estas seguro de entregar el premio?
          </p>
          <div className="flex justify-around items-center">
            <Button text="Entregar" onClick={handleSubmit}>
              <GiftIcon width={20} className="mr-2" />
            </Button>
            <Button text="Cancelar" level="second" onClick={onClose} />
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default ModalAward;
