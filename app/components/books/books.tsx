import React from 'react';
import { prisma } from '@/lib/prisma';
import BookCard from '../bookCard';

export default async function Books() {
const books = await prisma.book.findMany();


  return (
    <div className="flex px-3 flex-row w-full">
        <ul className="flex flex-row justify-start w-full gap-x-6 gap-y-5">
        {(books).map((book) => (
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
};