"use client";
import React from 'react';
import { Book } from '../../models/book';
import {createBook} from '../../actions/books';

const CreateBookModal = () => {

    const [book, setBook] = React.useState<Book>({
        id: 0,
        name: "",
        shortDescription: "",
        imageUrl: "",
        author: "",
        publishedAt: new Date(),
        genre: "",
        thematicKeywords: [],
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = event.target;
        setBook({
          ...book,
          [id]: value,
        });
      };

    const handleDateInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setBook({
          ...book,
          [id]: new Date(value),
        });
      }

      const handleThematicKeywordsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setBook({
          ...book,
          thematicKeywords: value.split(','),
        })
      };

      const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log(book);
        await createBook(book);
      };

  return (
    <dialog id="create_book_modal" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
  <form method="dialog">
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 className="font-bold text-lg">Create a book</h3>
    <form onSubmit={handleSubmit}>
      <div className="form-control">
        <label className="label" htmlFor="name">
          <span className="label-text">Name</span>
        </label>
        <input required type="text" id="name" className="input input-bordered" value={book.name} onChange={handleInputChange} />
      </div>
      <div className="form-control">
        <label className="label" htmlFor="author">
          <span className="label-text">Author</span>
        </label>
        <input required type="text" id="author" className="input input-bordered" value={book.author} onChange={handleInputChange} />
      </div>
    <div className="form-control">
        <label className="label" htmlFor="description">
            <span className="label-text">Description</span>
        </label>
        <textarea required id="shortDescription" onChange={handleInputChange} className="textarea textarea-bordered"></textarea>
    </div>
    <div className="form-control">
        <label className="label" htmlFor="name">
          <span className="label-text">Image Url (Only Norli URLs allowed)</span>
        </label>
        <input required type="text" id="imageUrl" className="input input-bordered" value={book.imageUrl} onChange={handleInputChange} />
      </div>
      <div className="form-control">
        <label className="label" htmlFor="publishedAt">
          <span className="label-text">Published At</span>
        </label>
        <input required type="date" id="publishedAt" className="input input-bordered" onChange={handleDateInputChange} />
      </div>
    <div className="form-control">
      <label className="label" htmlFor="genre">
        <span className="label-text">Genre</span>
      </label>
      <select required id="genre" className="select select-bordered" value={book.genre} onChange={handleInputChange} >
        <option value="fiction">Fiction</option>
        <option value="non-fiction">Non-Fiction</option>
        <option value="mystery">Mystery</option>
        <option value="fantasy">Fantasy</option>
        <option value="science-fiction">Science Fiction</option>
        <option value="biography">Biography</option>
        <option value="romance">Romance</option>
        <option value="thriller">Thriller</option>
        <option value="historical">Historical</option>
        <option value="self-help">Self-Help</option>
        <option value="poetry">Poetry</option>
      </select>
    </div>
    <div className="form-control">
        <label className="label" htmlFor="name">
          <span className="label-text">Thematic keywords, comma separated</span>
        </label>
        <input required type="text" id="thematicKeywords" className="input input-bordered" value={book.thematicKeywords} onChange={handleThematicKeywordsChange} />
      </div>
    </form>

    <div className="modal-action">
      <form onSubmit={handleSubmit} method="dialog" className="w-full">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn btn-primary w-full">Create</button>
      </form>
    </div>
  </div>
</dialog>
  );
};

export default CreateBookModal;