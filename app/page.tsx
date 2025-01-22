import Books from "./components/books/books";

export default function Home() {
// const [isMarking, setIsMarking] = useState(false);

// const handleMark = () => {
//   setIsMarking(!isMarking);
// };

  return (
  <div className="flex p-2 bg-white flex-col">
    <div className="flex flex-col mb-6">
    <p className="text-4xl font-sans font-semibold text-primary">Bibliotek applikasjon</p>
    <div className="flex gap-x-2">
      <div className="mt-2 btn btn-primary w-fit uppercase transition-transform duration-300 ease-in-out transform hover:scale-105">Add book</div>
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
