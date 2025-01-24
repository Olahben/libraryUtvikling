"use server";
import { prisma } from '@/lib/prisma';
import { Book } from "../models/book";

export async function deleteBook(id:number) {
    console.log("Deleting book with id: ", id);
    try {
        await prisma.book.delete({
            where: {
                id: id,
            },
        });
        return { success: true };
    } catch (error) {
        console.log(error);
    return { success: false, error: error };
    }
}

export async function createBook(book:Book) {
    console.log(book);
    try {
        await prisma.book.create({
            data: {
                name: book.name,
                shortDescription: book.shortDescription,
                imageUrl: book.imageUrl,
                author: book.author,
                publishedAt: book.publishedAt,
                createdAt: new Date(),
                updatedAt: new Date(),
                genre: book.genre,
                thematicKeywords: book.thematicKeywords,
            },
        });
    } catch (error) {
        console.log(error);
    }
}

export async function UpdateBook(book:Book) {
    console.log(book);
    try {
        await prisma.book.update({
            where: {
                id: book.id,
            },
            data: {
                name: book.name,
                shortDescription: book.shortDescription,
                imageUrl: book.imageUrl,
                author: book.author,
                publishedAt: book.publishedAt,
                updatedAt: new Date(),
                genre: book.genre,
                thematicKeywords: book.thematicKeywords,
            },
        });
    }
    catch (error) {
        console.log(error);
    }
}