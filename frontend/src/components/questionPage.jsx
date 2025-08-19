import { useEffect, useState } from "react";
import SearchBar from "./searchbar";
import Accordion from "./accordion";
import { fetchCategories } from "../services/api";

export default function QuestionsPage() {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [sortBy, setSortBy] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setPage(1);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({
      search: debouncedSearchTerm,
      page,
      limit,
      sortBy,
    });

fetchCategories(params)
      .then((data) => {
        setCategories(data.data || []);
        setTotalPages(data.pages || 1);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [debouncedSearchTerm, page, limit, sortBy]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-16 pb-16">
      <div className="max-w-3xl mx-auto pt-4 px-4">
        <div className="pt-24 pb-10 text-center">
          <h1 className="text-5xl font-extrabold mb-4 text-indigo-700 dark:text-indigo-400">
            Master Coding Interviews
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300 mb-10">
            Practice coding problems, track your progress, and ace your technical interviews with our curated collection of questions.
          </p>
          <div className="flex justify-center gap-6 flex-wrap mb-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 w-52 flex flex-col items-center">
              <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">150+</span>
              <span className="text-gray-600 dark:text-gray-300">Total Questions</span>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 w-52 flex flex-col items-center">
              <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">Only 1</span>
              <span className="text-gray-600 dark:text-gray-300">Active User</span>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 w-52 flex flex-col items-center">
              <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">10+</span>
              <span className="text-gray-600 dark:text-gray-300">Categories</span>
            </div>
          </div>
        </div>

        <SearchBar
          value={searchTerm}
          onChange={(val) => {
            setSearchTerm(val);
            setPage(1);
          }}
        />
        <br />
        <br />
        <div className="mb-6 flex justify-between items-center">
          <div>
            <label className="mr-2 dark:text-gray-200">Sort by: </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded px-2 py-1 border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            >
              <option value="">Default</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
          <div>
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1 || loading}
              className="mr-2 rounded bg-gray-200 px-3 py-1 disabled:opacity-50 hover:bg-blue-600 hover:text-white dark:bg-gray-700 dark:hover:bg-blue-400"
            >
              Prev
            </button>
            <span className="dark:text-gray-200">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages || loading}
              className="ml-2 rounded bg-gray-200 px-3 py-1 disabled:opacity-50 hover:bg-blue-600 hover:text-white dark:bg-gray-700 dark:hover:bg-blue-400"
            >
              Next
            </button>
          </div>
        </div>

        {loading && (
          <p className="text-center dark:text-gray-200">Loading...</p>
        )}
        {error && <p className="text-center text-red-600">{error}</p>}
        {!loading && !error && (
          categories.length === 0 ? (
            <p className="text-center dark:text-gray-200">No categories found.</p>
          ) : (
            <Accordion categories={categories} />
          )
        )}
      </div>
    </div>
  );
}
