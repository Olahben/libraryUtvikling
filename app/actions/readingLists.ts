"use server";
import { prisma } from '@/lib/prisma';
import { ReadingList } from '@prisma/client';
import { Book } from '@prisma/client';
import { GetBook } from './books';

export async function getAll(): Promise<ReadingList[]> {
    return await prisma.readingList.findMany();
}

export async function createReadingList(readingList: ReadingList) {
    // Ensure that all books have different genres
    // Ensure that all books have at least one common thematic keyword

    const books: Book[] = [];
    for(const item of readingList.books) {
        const book = await GetBook(item);
        if (book !== null) {
            books.push(book);
        }
    }

    // Ensures that all books have different genres
    const genreList: string[] = [];
    for(const book of books) {
        console.log(book.thematicKeywords);
        const genre: string = book.genre;

        // Add genre to list if it does not exist
        if (genre !== null) {
            if (!(genreList.includes(genre))) {
                genreList.push(genre);
            
                // Remove each book that has a duplicate genre.
            } else {
                books.splice(books.indexOf(book), 1);
            }
        }
    }
    readingList.books = books.map(book => book.id);

    // Ensure that all books have at least one common thematic keyword
    const commonKeywords = books
        .map(book => book.thematicKeywords)
        .reduce((acc, keywords) => acc.filter(keyword => keywords.includes(keyword)));

    console.log(`length: ${commonKeywords.length}`);

    if (commonKeywords.length === 0) {
        throw new Error('All books must have at least one common thematic keyword.');
    }

    console.log(readingList);

    await prisma.readingList.create({
        data: {
            name: readingList.name,
            books: readingList.books,
            updatedAt: new Date(),
            createdAt: new Date(),
        },
    });
}