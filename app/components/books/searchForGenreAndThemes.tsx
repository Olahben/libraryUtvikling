"use client";
import React from 'react';

interface props {
    searchCallback: (text: string) => void;
}

const GenreAndThemesSearch = (props: props) => {
    let searchText = "";

    function debounce(callback: (event: React.ChangeEvent<HTMLInputElement>) => void, delay: number) {
        let timeout: any;
        return function (...args: [React.ChangeEvent<HTMLInputElement>]) {
            clearTimeout(timeout);
            timeout = setTimeout(() => callback(...args), delay)
        }
    }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        searchText = event.target.value;
        props.searchCallback(searchText);
    }

    const debouncedHandleInputChange = debounce(handleInputChange, 500);

  return (
    <label className="input input-bordered flex items-center gap-2 max-w-md mb-5">
  <input type="text" className="grow" placeholder="Search for themes (comma separated)" onChange={debouncedHandleInputChange} />
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      fillRule="evenodd"
      d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
      clipRule="evenodd" />
  </svg>
</label>
  );
};

export default GenreAndThemesSearch;