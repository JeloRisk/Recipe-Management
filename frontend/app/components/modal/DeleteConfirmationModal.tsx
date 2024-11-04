/** @format */
"use client";
import React from "react";


const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ onClose, onConfirm, information }) => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/3'>
        <h2 className='text-xl font-bold mb-4'>Confirm Delete</h2>
        <p>
          Are you sure you want to delete this <b>{information}</b>?
        </p>
        <div className='flex justify-end mt-6'>
          <button
            className='bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300 mr-4'
            onClick={onClose}>
            Cancel
          </button>
          <button
            className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300'
            onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
