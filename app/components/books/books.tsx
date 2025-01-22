import React from 'react';
import { prisma } from '@/lib/prisma';
import BookCard from '../bookCard';

interface BookCardProps {
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
const bookCards: BookCardProps[] = await Promise.all(
    books.map(async (book) => {
        const genre = await prisma.genre.findUnique({ where: { id: book.genreId } });
        const thematicKeywords = await prisma.thematicKeyword.findMany({
            where: { id: { in: book.thematicKeywordId } },
        });

        return {
            name: book.name,
            author: book.author,
            publishedAt: book.publishedAt,
            genre: genre?.name || '',
            imageUrl: book.imageUrl,
            shortDescription: book.shortDescription,
            thematicKeywords: thematicKeywords.map((keyword) => keyword.name),
        };
    })
);


  return (
    <div className="flex px-3">
        <ul>
        {(bookCards).map((book) => (
          <li className="" key={book.name}>
            <BookCard
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