import { useState } from "react";

export default function Accordion({ categories }) {
  // Track which category is open
  const [openIndex, setOpenIndex] = useState(null);

  // Toggle accordion
  const handleToggle = idx => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div>
      {categories.map((category, idx) => (
        <div key={category._id} className="mb-4 border rounded">
          <button
            className="w-full text-left py-2 px-4 bg-gray-100 font-semibold"
            onClick={() => handleToggle(idx)}
          >
            {category.title}
          </button>
          {openIndex === idx && (
            <ul className="ml-4 py-2">
              {category.questions.map(q => (
                <li key={q._id} className="py-1 text-gray-800">
                  <a
                    href={q.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {q.title}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
