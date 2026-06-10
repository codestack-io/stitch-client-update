import React from "react";

const Modal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-80 shadow-lg">

        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Confirm Logout
        </h2>

        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
          Are you sure you want to logout?
        </p>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 text-sm"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-xl bg-[#FF62BB] text-white text-sm"
          >
            Logout
          </button>

        </div>
      </div>
    </div>
  );
};

export default Modal;