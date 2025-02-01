"use client";
import React, { useState, useEffect } from 'react';
import { Book, ReadingList } from '@prisma/client';
import { GetMany } from '@/app/actions/books';
import { createReadingList } from '@/app/actions/readingLists';

const CreateReadingListModal = () => {

    const [readingList, setReadingList] = useState<ReadingList>({
        id: 0,
        name: "",
        books: [],
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    const [books, setBooks] = useState<Book[]>();

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setReadingList({...readingList, [event.target.id]: value})
    }

    function handleSelectedBooks(event: React.ChangeEvent<HTMLSelectElement>) {
        const selectedValues = Array.from(event.target.selectedOptions, option => parseInt(option.value));
    
        if (selectedValues.some(isNaN)) {
            setReadingList(prevState => ({
                ...prevState,
                books: []
            }));
            return;
        }
    
        setReadingList(prevState => ({
            ...prevState,
            books: selectedValues
        }));
    }

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        console.log(readingList);
        try {
        await createReadingList(readingList);
        } catch(error) {
            console.log(`error: ${error}`);
        }
    }

    useEffect(() => {
        async function fetchBooks() {
            setBooks(await GetMany());
        }
        fetchBooks();
    }, [])

  return (
    <dialog id="create_reading_list_modal" className="modal modal-bottom sm:modal-middle">
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
              <input required type="text" id="name" className="input input-bordered" value={readingList?.name} onChange={handleInputChange} />
            </div>

            <div className="form-control">
                <label className="label" htmlFor="books">
                    <span className="label-text">Books</span>
                </label>
                <select onChange={handleSelectedBooks} className="select w-full max-w-lg" multiple>
                    {books?.map((book) => (
                        <option key={book.id} value={book.id}>
                            {book.name}
                        </option>
                    ))}
                </select>
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

export default CreateReadingListModal;