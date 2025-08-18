export default function SearchBar({ value, onChange, className }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search questions..."
      className={`w-full border border-gray-300 bg-white px-4 py-2 text-gray-900
        focus:outline-none focus:ring-2 focus:ring-blue-600
        dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100
        rounded-2xl ${className || ""}`}
    />
  );
}
