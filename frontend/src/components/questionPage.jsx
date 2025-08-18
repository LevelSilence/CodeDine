import { useEffect, useState } from "react";
import SearchBar from "./searchbar";
import Accordion from "./accordion";

export default function QuestionPage() {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(5); // fixed page size or make adjustable
  const [sortBy, setSortBy] = useState(""); // '' or 'name'
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Debounce searchTerm changes
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setPage(1); // Reset to first page on new search
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    setLoading(true);
    // Build query string with active filters and pagination
    const params = new URLSearchParams({
      search: debouncedSearchTerm,
      page,
      limit,
      sortBy,
    });

    fetch(`/api/v1/content?${params.toString()}`)
      .then(res => {
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        return res.json();
      })
      .then(data => {
        setCategories(data.data || []);
        setTotalPages(data.pages || 1);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [debouncedSearchTerm, page, limit, sortBy]);


  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-2xl mx-auto pt-10 px-4">
        <h1 className="text-3xl font-bold mb-6 text-blue-700 dark:text-indigo-300 text-center">LeetCode</h1>
        <SearchBar
          value={searchTerm}
          onChange={val => {
            setSearchTerm(val);
            setPage(1);
          }}
        />
        <div className="mb-4 flex justify-between items-center">
          <div>
            <label className="mr-2 dark:text-gray-200">Sort by: </label>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="rounded px-2 py-1 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-100"
            >
              <option value="">Default</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
          <div>
            <button
              onClick={() => setPage(p => Math.max(p - 1, 1))}
              disabled={page === 1 || loading}
              className="mr-2 px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="dark:text-gray-200">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(p + 1, totalPages))}
              disabled={page === totalPages || loading}
              className="ml-2 px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
        {loading && <p className="text-center mt-8 dark:text-gray-200">Loading...</p>}
        {error && <p className="text-center mt-8 text-red-600">{error}</p>}
        {!loading && !error && (
          categories.length === 0 ? (
            <p className="dark:text-gray-200">No categories found.</p>
          ) : (
            <Accordion categories={categories} />
          )
        )}
      </div>
    </div>
  );
}

