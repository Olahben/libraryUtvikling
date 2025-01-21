import { prisma } from "@/lib/prisma";
import BookCard from "./components/bookCard";

export default async function Home() {
const books = prisma.book.findMany();

  return (
  <div className="flex p-2 bg-white flex-col">
    <div className="flex">
    <p className="text-4xl font-sans font-semibold text-primary">Bibliotek applikasjon</p>
    </div>
    <div className="flex">
      <ul>
        {(await books).map((book) => (
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
  </div>
  );
}
