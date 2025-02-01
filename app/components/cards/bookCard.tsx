"use client"
import React, {useState} from 'react';
import Image from 'next/image';
import { deleteBook } from '../actions/books';
import UpdateBookModal from './modals/updateBookModal';
import { Book } from '../models/book';

interface BookCardProps {
    id: number;
    name: string;
    shortDescription: string;
    imageUrl: string;
    author:string;
    publishedAt: Date;
    genre: string;
    thematicKeywords: string[];
}

const BookCard: React.FC<BookCardProps> = ({ id, name, shortDescription, imageUrl, author, publishedAt, genre, thematicKeywords }) => {
    const book: Book = {
        id,
        name,
        shortDescription,
        imageUrl,
        author,
        publishedAt,
        genre,
        thematicKeywords,
    };

    async function handleDelete() {
        console.log("Deleting book with id: ", id);
        const result = await deleteBook(id);
        if (result.success) {
            alert("Book deleted successfully");
        } else {
            alert("Failed to delete book");
        }
    }

    const [showUpdateText, setShowUpdateText] = useState(false);

    return (
        <div className="card bg-[var(--background)] shadow-xl flex flex-row transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:cursor-pointer" onMouseEnter={() => setShowUpdateText(true)} onMouseLeave={() => setShowUpdateText(false)}>
            <div className="card-body p-2 max-w-[300px]">
            <div className="flex w-full items-baseline">
                <h2 className="font-sans font-semibold">{name}</h2>
                <p className="font-sans text-start">, By {author}, released {publishedAt.getFullYear()}</p>
            </div>
            <p className="font-sans text-[15px]">{shortDescription} ({genre})</p>
            <div>
                <p className="text-base font-semibold">Categorized as:</p>
                {thematicKeywords.map((keyword) => (
                    <ul key={keyword}>
                        <li>{keyword}</li>
                    </ul>
                ), [])}
            </div>
            </div>
            <figure>
            <Image src={imageUrl} width={150} height={250} alt="Book title" />
            </figure>
            {showUpdateText && (
                <div className="absolute bottom-0 left-0 w-full bg-gray-200 text-center p-1">
                    <p className="text-sm text-gray-700">Last updated on {new Date().toLocaleDateString()}</p>
                    <div className="flex text-sm gap-x-2 text-center justify-center">
                        <p onClick={() => (document.getElementById("update_book_modal") as HTMLDialogElement).showModal()} className="hover:text-blue-500 cursor-pointer">update</p>
                        <UpdateBookModal book={book} />
                        <p onClick={handleDelete} className="hover:text-blue-500 cursor-pointer">delete</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookCard;