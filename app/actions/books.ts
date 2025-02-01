"use server";
import { prisma } from '@/lib/prisma';
import { Book } from '@prisma/client';

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

export async function GetBook(id: number): Promise<Book | null> {
    try {
        return await prisma.book.findFirst({
            where: {
                id: id
            }
        });
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function createBook(book:Book) {
    book.thematicKeywords = book.thematicKeywords.map(keyword => keyword.trim());
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

export async function GetManyWithThemes(themes: string) {
    const thematicKeyWordsArr = themes.split(",");
    return await prisma.book.findMany({
        where: {
        thematicKeywords: {
            hasSome: thematicKeyWordsArr,
        }
        }
    })
}

export async function GetMany() {
    try {
        return await prisma.book.findMany();
    } catch (error) {
        console.log(error);
    }
}