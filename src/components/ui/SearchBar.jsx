

import { useEffect, useId, useState } from "react";
import { LoaderCircleIcon, MicIcon, SearchIcon, XIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SearchBar() {
  const id = useId();
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // 🔹 LocalStorage থেকে previous search load করা
  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setSearchHistory(storedHistory);
  }, []);

  // 🔹 Loading effect
  useEffect(() => {
    if (inputValue) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 500);
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [inputValue]);

  // 🔹 Search handle
  const handleSearch = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const updatedHistory = [
      inputValue,
      ...searchHistory.filter((item) => item !== inputValue),
    ].slice(0, 5);

    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));

    console.log("Searching for:", inputValue);

    // 🧹 Search শেষে input clear করো
    setInputValue("");
    setShowSuggestions(false);
  };

  // 🔹 Suggestion delete
  const handleDelete = (term) => {
    const updated = searchHistory.filter((item) => item !== term);
    setSearchHistory(updated);
    localStorage.setItem("searchHistory", JSON.stringify(updated));
  };

  // 🔹 Suggestion select
  const handleSelect = (term) => {
    setInputValue(term);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <Label htmlFor={id} className="sr-only">
        Search
      </Label>

      <form onSubmit={handleSearch} className="relative">
        <Input
          id={id}
          className="peer ps-9 pe-9"
          placeholder="Search..."
          type="search"
          value={inputValue}
          onFocus={() => setShowSuggestions(true)}
          onChange={(e) => setInputValue(e.target.value)}
        />

        {/* Left Icon */}
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80">
          {isLoading ? (
            <LoaderCircleIcon className="animate-spin" size={16} role="status" />
          ) : (
            <SearchIcon size={16} aria-hidden="true" />
          )}
        </div>

        {/* Right Mic Button */}
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 hover:text-foreground"
        >
          <MicIcon size={16} aria-hidden="true" />
        </button>
      </form>

      {/* 🔽 Suggestion Box */}
      {showSuggestions && searchHistory.length > 0 && (
        <div className="absolute z-10 bg-white border rounded-md mt-1 shadow-md w-full">
          {searchHistory.map((term, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <span onClick={() => handleSelect(term)}>{term}</span>
              <button
                onClick={() => handleDelete(term)}
                className="text-gray-400 hover:text-red-500"
              >
                <XIcon size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
