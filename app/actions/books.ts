"use server";
import { prisma } from '@/lib/prisma';

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