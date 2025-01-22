import React from 'react';

const CreateBookModal = () => {
  return (
    <dialog id="create_book_modal" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Create a book</h3>
    <form>
      <div className="form-control">
        <label className="label" htmlFor="name">
          <span className="label-text">Name</span>
        </label>
        <input type="text" id="name" className="input input-bordered" />
      </div>
      <div className="form-control">
        <label className="label" htmlFor="author">
          <span className="label-text">Author</span>
        </label>
        <input type="text" id="author" className="input input-bordered" />
      </div>
      <div className="form-control">
        <label className="label" htmlFor="publishedAt">
          <span className="label-text">Published At</span>
        </label>
        <input type="date" id="publishedAt" className="input input-bordered" />
      </div>
    <div className="form-control">
      <label className="label" htmlFor="genre">
        <span className="label-text">Genre</span>
      </label>
      <select id="genre" className="select select-bordered">
        <option value="fiction">Fiction</option>
        <option value="non-fiction">Non-Fiction</option>
        <option value="mystery">Mystery</option>
        <option value="fantasy">Fantasy</option>
        <option value="science-fiction">Science Fiction</option>
        <option value="biography">Biography</option>
      </select>
    </div>
    <div className="form-control">
      <label className="label" htmlFor="tags">
        <span className="label-text">Tags</span>
      </label>
      <select id="tags" className="select select-bordered" multiple>
        <option value="bestseller">Bestseller</option>
        <option value="classic">Classic</option>
        <option value="new-release">New Release</option>
        <option value="award-winner">Award Winner</option>
        <option value="recommended">Recommended</option>
      </select>
      </div>
    </form>

    <div className="modal-action">
      <form method="dialog" className="w-full modal-backdrop flex justify-end gap-x-3">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn btn-secondary">Close</button>
        <button className="btn btn-primary">Create</button>
      </form>
    </div>
  </div>
</dialog>
  );
};

export default CreateBookModal;