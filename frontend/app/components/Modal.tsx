// components/Modal.tsx

import React from 'react';

export const Modal = ({ children }) => (
  <div className="fixed inset-0 flex items-center justify-center z-50">{children}</div>
);

export const ModalOverlay = ({ onClick }) => (
  <div className="fixed inset-0 bg-black opacity-50" onClick={onClick}></div>
);

export const ModalContent = ({ children }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full z-10">{children}</div>
);

export const ModalCloseButton = ({ onClick }) => (
  <button
    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
    onClick={onClick}
  >
    &times;
  </button>
);
