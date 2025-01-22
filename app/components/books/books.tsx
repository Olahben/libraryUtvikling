import React from 'react';
import { prisma } from '@/lib/prisma';
import BookCard from '../bookCard';

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

export default async function Books() {
const books = await prisma.book.findMany();


  return (
    <div className="flex px-3">
        <ul>
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