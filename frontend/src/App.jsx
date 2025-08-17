import { useEffect, useState } from "react";
import SearchBar from "./components/searchbar";
import Accordion from "./components/accordion";

export default function App() {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/v1/content')
      .then(res => res.json())
      .then(data => {
        // Assume data.data contains the categories with populated questions
        setCategories(data.data || []);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Filter questions inside categories by question title (case-insensitive)
  const filteredCategories = categories
    .map(category => ({
      ...category,
      questions: category.questions.filter(q =>
        q.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }))
    .filter(category => category.questions.length > 0);

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (error) return <p className="text-center mt-8 text-red-600">Error: {error}</p>;

  return (
    <div className="max-w-xl mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-700 text-center">Frontend Feast</h1>
      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      {filteredCategories.length === 0 ? (
        <p>No questions match your search.</p>
      ) : (
        <Accordion categories={filteredCategories} />
      )}

    </div>
  );
}
