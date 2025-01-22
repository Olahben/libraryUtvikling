"use client"
import React, {useState} from 'react';
import Image from 'next/image';

interface BookCardProps {
    name: string;
    shortDescription: string;
    imageUrl: string;
    author:string;
    publishedAt: Date;
    genre: string;
    thematicKeywords: string[];
}

const BookCard: React.FC<BookCardProps> = ({ name, shortDescription, imageUrl, author, publishedAt, genre, thematicKeywords }) => {

    const [showUpdateText, setShowUpdateText] = useState(false);

    return (
        <div className="card bg-[var(--background)] shadow-xl flex flex-row transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:cursor-pointer" onMouseEnter={() => setShowUpdateText(true)} onMouseLeave={() => setShowUpdateText(false)}>
            <div className="card-body p-2 max-w-[300px]">
            <div className="flex w-full items-baseline">
                <h2 className="font-sans font-semibold">{name}</h2>
                <p className="font-sans text-start">, By {author}, released {publishedAt.getFullYear()}</p>
            </div>
            <p className="font-sans text-[15px]">{shortDescription} ({genre})</p>
            <div>
                <p className="text-base font-semibold">Categorized as:</p>
                {thematicKeywords.map((keyword) => (
                    <ul key={keyword}>
                        <li>{keyword}</li>
                    </ul>
                ), [])}
            </div>
            </div>
            <figure>
            <Image src={imageUrl} width={150} height={250} alt="Book title" />
            </figure>
            {showUpdateText && (
                <div className="absolute bottom-0 left-0 w-full bg-gray-200 text-center p-1">
                    <p className="text-sm text-gray-700">Last updated on {new Date().toLocaleDateString()}</p>
                    <div className="flex text-sm gap-x-2 text-center justify-center">
                        <p className="hover:text-blue-500 cursor-pointer">update</p>
                        <p className="hover:text-blue-500 cursor-pointer">delete</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookCard;