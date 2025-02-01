"use client";
import Books from "./components/books/books";
import CreateBookButton from "./components/buttons/createBookButton";
import CreateReadingListButton from "./components/buttons/createReadingListButton";
import CreateBookModal from "./components/modals/createBookModal";
import { useState, useEffect } from "react";
import CreateReadingListModal from "./components/modals/createReadingList";

export default function Home() {
  const [isClient, setIsClient] = useState(false);
// const [isMarking, setIsMarking] = useState(false);

// const handleMark = () => {
//   setIsMarking(!isMarking);
// };

useEffect(() => {
  setIsClient(true);
}, [])
if (isClient) {
  return (
  <div className="flex p-2 bg-white flex-col">
    <div className="flex flex-col mb-6">
    <p className="text-4xl font-sans font-semibold text-primary">Library</p>
    <div className="flex gap-x-2">
    <CreateBookButton />
    <CreateReadingListButton />
    <CreateReadingListModal />
    <CreateBookModal />
      {/* {isMarking ? (
        <div
        onClick={handleMark}
        className="mt-2 btn btn-secondary text-black w-fit uppercase transition-transform duration-300 ease-in-out transform hover:scale-105">
        Mark
      </div>
      ) : (
        <div
        onClick={handleMark}
        className="mt-2 btn btn-secondary text-black w-fit uppercase transition-transform duration-300 ease-in-out transform hover:scale-105">
        Cancel marking
      </div>
      )} */}
    </div>
    </div>
    <Books />
  </div>
  );
}
}
