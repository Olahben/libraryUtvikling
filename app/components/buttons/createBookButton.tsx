"use client";
import React from 'react';

const CreateBookButton = () => {
  return (
    <div onClick={() => (document.getElementById("create_book_modal") as HTMLDialogElement).showModal()} className="mt-2 btn btn-primary w-fit uppercase transition-transform duration-300 ease-in-out transform hover:scale-105">Add book</div>
  );
};

export default CreateBookButton;