export async function fetchCategories(params) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/v1/content?${query}`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}
