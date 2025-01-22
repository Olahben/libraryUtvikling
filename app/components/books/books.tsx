import React from 'react';
import { prisma } from '@/lib/prisma';
import BookCard from '../bookCard';

export default async function Books() {
const books = await prisma.book.findMany();

  return (
    <div className="flex px-3">
        <ul>
        {(books).map((book) => (
          <li className="" key={book.id}>
            <BookCard
              name={book.name}
              author={book.author}
              publishedAt={book.publishedAt}
              genreId={book.genreId}
              imageUrl={book.imageUrl}
              shortDescription={book.shortDescription}
              thematicKeywordIds={book.thematicKeywordId}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};