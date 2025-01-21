import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Create a genre
    const genre = await prisma.genre.upsert({
        where: { name: 'Science Fiction' },
        update: {},
        create: {
            name: 'Science Fiction',
        },
    });

    // Upsert a thematic keyword
    const keyword = await prisma.thematicKeyword.upsert({
        where: { name: 'Dystopian' },
        update: {},
        create: {
            name: 'Dystopian',
        },
    });

    // Upsert a book
    const book = await prisma.book.upsert({
        where: { id: 1 }, // Assuming 1 is the unique identifier for the book '1984'
        update: {},
        create: {
            name: '1984',
            shortDescription: 'A dystopian social science fiction novel',
            imageUrl: 'https://www.norli.no/media/catalog/product/9/7/9780141036144_1_1.jpg?auto=webp&format=pjpg&width=480&height=375&fit=cover',
            author: 'George Orwell',
            publishedAt: new Date('1949-06-08'),
            genreId: genre.id,
            thematicKeywordId: [keyword.id],
        },
    });

    console.log({ genre, keyword, book });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });