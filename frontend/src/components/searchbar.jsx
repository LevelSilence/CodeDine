export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      className="px-4 py-2 w-full border rounded mb-6 focus:outline-none"
      placeholder="Search questions..."
    />
  );
}
