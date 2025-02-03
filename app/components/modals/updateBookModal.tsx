"use client";
import React from 'react';
import { Book } from '@prisma/client';
import { UpdateBook } from '@/app/actions/books';


interface UpdateBookModalProps {
    book: Book;
}

const UpdateBookModal: React.FC<UpdateBookModalProps> = ({ book }) => {
    const [updatedBook, setBook] = React.useState<Book>(book);

    
    function handleInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        setBook({ ...updatedBook, [event.target.id]: event.target.value });

    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!updatedBook.name || !updatedBook.author || !updatedBook.shortDescription || !updatedBook.imageUrl || !updatedBook.publishedAt || !updatedBook.genre || !updatedBook.thematicKeywords.length) {
          alert("All fields are required and must be filled out.");
          return;
        }
        console.log(updatedBook);
        await UpdateBook(updatedBook);
      };

    function handleDateInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setBook({ ...updatedBook, publishedAt: new Date(event.target.value) });
    }

    function handleThematicKeywordsChange(event: React.ChangeEvent<HTMLInputElement>) {
        setBook({ ...updatedBook, thematicKeywords: event.target.value.split(',') });
    }


    return (
        <dialog id="update_book_modal" className="modal modal-bottom sm:modal-middle">
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
              <input required type="text" id="name" className="input input-bordered" value={updatedBook.name} onChange={handleInputChange} />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="author">
                <span className="label-text">Author</span>
              </label>
              <input required type="text" id="author" className="input input-bordered" value={updatedBook.author} onChange={handleInputChange} />
            </div>
          <div className="form-control">
              <label className="label" htmlFor="description">
                  <span className="label-text">Description</span>
              </label>
              <textarea required id="shortDescription" value={updatedBook.shortDescription} onChange={handleInputChange} className="textarea textarea-bordered"></textarea>
          </div>
          <div className="form-control">
              <label className="label" htmlFor="name">
                <span className="label-text">Image Url (Only Norli URLs allowed)</span>
              </label>
              <input required type="text" id="imageUrl" className="input input-bordered" value={updatedBook.imageUrl} onChange={handleInputChange} />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="publishedAt">
                <span className="label-text">Published At</span>
              </label>
              <input required type="date" value={updatedBook.publishedAt.toISOString().split('T')[0]} id="publishedAt" className="input input-bordered" onChange={handleDateInputChange} />
            </div>
          <div className="form-control">
            <label className="label" htmlFor="genre">
              <span className="label-text">Genre</span>
            </label>
            <select value={updatedBook.genre} required id="genre" className="select select-bordered" onChange={handleInputChange} >
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
              <input required type="text" id="thematicKeywords" className="input input-bordered" value={updatedBook.thematicKeywords} onChange={handleThematicKeywordsChange} />
            </div>
          </form>
      
          <div className="modal-action">
            <form onSubmit={handleSubmit} method="dialog" className="w-full">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-primary w-full">Update</button>
            </form>
          </div>
        </div>
      </dialog>
    );
};

export default UpdateBookModal;