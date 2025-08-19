export async function fetchCategories() {
  const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/v1/content`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json(); // Adjust based on your backend response shape
}

