"use client";
import useDebounce from "@/hooks/useDebounce";
import autoprefixer from "autoprefixer";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const tech_keywords = [
  "artificial intelligence",
  "machine learning",
  "data science",
  "cloud computing",
  "cybersecurity",
  "blockchain technology",
  "Internet of Things (IoT)",
  "augmented reality",
  "virtual reality",
  "5G technology",
  "quantum computing",
  "web development",
  "mobile app development",
  "big data analytics",
  "artificial neural networks",
  "natural language processing (NLP)",
  "robotics and automation",
  "drones and UAVs",
  "nanotechnology",
  "autonomous vehicles",
];

const AutoComplete = ({ search_words, onChoose }) => {
  console.log(search_words);
  return (
    <div class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow max-w-lg mx-auto mt-[-30px]">
      <ul class="py-2 text-sm text-gray-700">
        {search_words.map((word) => (
          <li
            key={word}
            className="block px-4 py-2 hover:bg-gray-100"
            onClick={() => onChoose(word)}
          >
            {word}
          </li>
        ))}
      </ul>
    </div>
  );
};

const SearchBar = () => {
  const searchRef = useRef();
  const [title, setTitle] = useState("");
  const debouncedSearchTerm = useDebounce(title, 500);
  const [filteredData, setFilterData] = useState([]);
  const selectAutoCompleteHandler = (word) => {
    searchRef.current.value = word;
  };
  useEffect(() => {
    if (debouncedSearchTerm.length < 1) {
      setFilterData([]);
      return;
    }
    setFilterData(
      tech_keywords.filter((item) =>
        item.toLowerCase().includes(debouncedSearchTerm.trim().toLowerCase())
      )
    );
  }, [debouncedSearchTerm]);

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "") return;
    router.push(`/blogs/search?title=${title}`);
  };

  return (
    <div>
      <form className="max-w-lg mx-auto mb-9">
        <div className="relative">
          <input
            autocomplete="off"
            type="search"
            id="default-search"
            className="block w-full p-4 pr-10 text-sm text-gray-900 border-2 border-gray-900 rounded-full focus:outline-none bg-white focus:border-blue-500"
            placeholder="SEARCH..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            ref={searchRef}
          />
          <button
            onClick={handleSubmit}
            className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events"
          >
            Search
          </button>
        </div>
      </form>
      {filteredData.length > 0 ? (
        <AutoComplete
          search_words={filteredData}
          onChoose={selectAutoCompleteHandler}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default SearchBar;
