import { prisma } from '@/lib/prisma';
import React from 'react';
import Image from 'next/image';

interface BookCardProps {
    name: string;
    shortDescription: string;
    imageUrl: string;
    author:string;
    publishedAt: Date;
    genreId: number;
    thematicKeywordIds: number[];
}

const BookCard: React.FC<BookCardProps> = ({ name, shortDescription, imageUrl, author, publishedAt, genreId, thematicKeywordIds }) => {
    const genre = prisma.genre.findUnique({
        where: { id: genreId }
    }).then((genre) => {
        return genre?.name;
    });
    const thematicKeyWords = Promise.all(
        thematicKeywordIds.map(async (id) => {
            const keyword = await prisma.thematicKeyword.findUnique({
                where: { id }
            });
            return keyword?.name;
        })
    );

    return (
        <div className="card bg-[var(--background)] shadow-xl flex flex-row transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="card-body p-2 max-w-[300px]">
            <div className="flex w-full items-baseline">
                <h2 className="font-sans font-semibold">{name}</h2>
                <p className="font-sans text-start">, By {author}, released {publishedAt.getFullYear()}</p>
            </div>
            <p className="font-sans text-[15px]">{shortDescription} ({genre})</p>
            <div>
                <p className="text-base font-semibold">Categorized as:</p>
                {thematicKeyWords.then((keywords) => (
                <ul>
                    {keywords.map((keyword, index) => (
                    <li className="text-[15px]" key={index}>{keyword}</li>
                    ))}
                </ul>
                ))}
            </div>
            </div>
            <figure>
            <Image src={imageUrl} width={150} height={250} alt="Book title" />
            </figure>
        </div>
    );
};

export default BookCard;