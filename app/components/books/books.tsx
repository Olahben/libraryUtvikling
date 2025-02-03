"use client";
import React, { useState } from 'react';
import { GetMany, GetManyWithThemes } from '@/app/actions/books';
import BookCard from '../cards/bookCard';
import GenreAndThemesSearch from './searchForGenreAndThemes';
import { Book } from '@/app/models/book';
import { ReadingList } from '@prisma/client';
import { getAll } from '@/app/actions/readingLists';
import ReadingListCard from '../cards/readingListCard';
import { read } from 'fs';

export default function Books() {
const [books, setBooks] = React.useState<Book[]>([]);
const [readingLists, setReadingLists] = React.useState<ReadingList[]>([]);
const [isClient, setIsClient] = useState(false);

React.useEffect(() => {
  setIsClient(true);
  GetMany().then((data) => {
    if (data) {
      setBooks(data);
    }
  });
}, []);

React.useEffect(() => {

  getAll().then((data) => {
    if (data) {
      setReadingLists(data);
    }
  })
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
        <div role="tablist" className="tabs tabs-bordered">
          <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Books" />
          <div role="tabpanel" className="tab-content p-10">
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

          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab"
            aria-label="Reading lists"
            defaultChecked />
          <div role="tabpanel" className="tab-content p-10">
            <ul className="flex flex-row justify-start w-full gap-x-6 gap-y-5">
          {readingLists.map((readingList) => (
          <li className="" key={readingList.id}>
            <ReadingListCard
            readingList={readingList}
            />
          </li>
        ))}
            </ul>
          </div>
        </div>
    </div>
  );
}
};