import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 ">
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 mb-4">
          Close
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;