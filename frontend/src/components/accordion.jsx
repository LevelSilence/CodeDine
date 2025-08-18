import React, { useState } from "react";

export default function Accordion({ categories }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      {categories.map((category, idx) => (
        <div key={category._id} className="mb-4 rounded-2xl bg-gray-100 dark:bg-gray-900 shadow-sm">
          <button
            onClick={() => toggleOpen(idx)}
            className="w-full px-6 py-4 text-left font-semibold text-gray-900 dark:text-white flex justify-between items-center rounded-2xl"
          >
            <span>{category.title} ({category.questions.length} questions)</span>
            <span className="text-xl text-gray-500 dark:text-gray-400">
              {openIndex === idx ? "▲" : "▼"}
            </span>
          </button>
          {openIndex === idx && (
            <div className="p-6 pt-2">
              {category.questions.map((q) => (
                <div
                  key={q._id}
                  className="mb-4 rounded-xl border border-gray-300 dark:border-gray-700 p-4 bg-white dark:bg-gray-800 shadow hover:shadow-lg transition flex flex-col md:flex-row md:items-center md:justify-between"
                >
                  <div className="flex items-center gap-4 mb-2 md:mb-0">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{q.title}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        q.difficulty === "Easy"
                          ? "bg-blue-200 text-blue-700 dark:bg-blue-800 dark:text-blue-300"
                          : q.difficulty === "Medium"
                          ? "bg-purple-200 text-purple-700 dark:bg-purple-800 dark:text-purple-300"
                          : "bg-red-200 text-red-700 dark:bg-red-800 dark:text-red-300"
                      }`}
                    >
                      {q.difficulty}
                    </span>
                  </div>
                  <a
                    href={q.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 rounded-lg bg-black text-white dark:bg-gray-700 dark:text-white font-semibold hover:bg-blue-600 dark:hover:bg-blue-400 transition"
                  >
                    View Problem
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
