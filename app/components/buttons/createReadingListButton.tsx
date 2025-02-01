import React from 'react';

const CreateReadingListButton = () => {
  return (
    <div onClick={() => (document.getElementById("create_reading_list_modal") as HTMLDialogElement).showModal()} className="mt-2 btn btn-primary w-fit uppercase transition-transform duration-300 ease-in-out transform hover:scale-105">Create reading list</div>
  );
};

export default CreateReadingListButton;