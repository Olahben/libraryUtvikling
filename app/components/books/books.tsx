"use client";
import React, { useState } from 'react';
import { GetMany, GetManyWithThemes } from '@/app/actions/books';
import BookCard from '../bookCard';
import GenreAndThemesSearch from './searchForGenreAndThemes';
import { Book } from '@/app/models/book';

export default function Books() {
const [books, setBooks] = React.useState<Book[]>([]);
const [isClient, setIsClient] = useState(false);

React.useEffect(() => {
  setIsClient(true);
  GetMany().then((data) => {
    if (data) {
      setBooks(data);
    }
  });
}, []);

function searchForBooksWithThemes(text: string) {
  GetManyWithThemes(text).then(resultBooks => {
    if (resultBooks.length > 0) {
      setBooks(resultBooks);
    } else {
      GetMany().then((data) => {
        if (data) {
          setBooks(data);
        }
      });
    }
  });
}


  if (!isClient) {
    return null;
  } else {
  return (
    <div className="flex px-3 flex-col w-full">
        <GenreAndThemesSearch searchCallback={searchForBooksWithThemes} />
        <ul className="flex flex-row justify-start w-full gap-x-6 gap-y-5">
        {books.map((book) => (
          <li className="" key={book.name}>
            <BookCard
            id={book.id}
              name={book.name}
              author={book.author}
              publishedAt={book.publishedAt}
              genre={book.genre}
              imageUrl={book.imageUrl}
              shortDescription={book.shortDescription}
              thematicKeywords={book.thematicKeywords}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
};