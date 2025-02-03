"use client"
import React, { useEffect, useState} from 'react';
import { ReadingList } from '@prisma/client';
import { deleteReadingList } from '@/app/actions/readingLists';
import { GetBook } from '@/app/actions/books';

interface ReadingListCardProps {
    readingList: ReadingList;
}

const ReadingListCard: React.FC<ReadingListCardProps> = ({readingList}) => {

    const [showUpdateText, setShowUpdateText] = useState(false);
    const [bookNames, setBookNames] = useState<string[]>([]);

    function handleDelete() {
        try {
            deleteReadingList(readingList.id);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                console.log(readingList);
                const bookPromises = readingList.books.map(async (bookId) => {
                    const book = await GetBook(bookId);
                    return book ? book.name : null;
                });
    
                const bookNamesArray = await Promise.all(bookPromises);
                const validBookNames = bookNamesArray.filter(name => name !== null);
                setBookNames(validBookNames);
            } catch (error) {
                console.log(error);
            }
        };
    
        fetchBooks();
    }, [readingList]);

  return (
    <div className="card p-6 bg-[var(--background)] shadow-xl flex flex-row transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:cursor-pointer" onMouseEnter={() => setShowUpdateText(true)} onMouseLeave={() => setShowUpdateText(false)}>
        <p>{readingList.name} reading list:</p>
        <ul>
            {bookNames.map((keyword, index) => (
                <li key={`${keyword}-${index}`}>{keyword}</li>
            ))}
        </ul>
    {showUpdateText && (
                    <div className="absolute bottom-0 left-0 w-full bg-gray-200 text-center p-1">
                        <p className="text-sm text-gray-700">Last updated on {new Date().toLocaleDateString()}</p>
                        <div className="flex text-sm gap-x-2 text-center justify-center">
                            <p onClick={handleDelete} className="hover:text-blue-500 cursor-pointer">delete</p>
                        </div>
                    </div>
    )}
    </div>
  );
};

export default ReadingListCard;