// File: frontend/src/pages/library/books/BooksList.jsx
// Books List Page – Searching, filtering, pagination
// TailwindCSS + React Hooks + API placeholders

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BooksList() {
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // search + filter
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  // pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchBooks() {
      setLoading(true);
      setError(null);
      try {
        const query = new URLSearchParams({ search, category, status, page });
        const res = await fetch(`/api/books?${query.toString()}`);
        if (!res.ok) {
          // Use mock data if API is not available
          const mockBooks = [
            { id: 1, title: "Introduction to React", author: "John Doe", category: "Technology", isbn: "978-1234567890", status: "available" },
            { id: 2, title: "Advanced JavaScript", author: "Jane Smith", category: "Technology", isbn: "978-0987654321", status: "issued" },
            { id: 3, title: "Data Science Basics", author: "Mike Johnson", category: "Science", isbn: "978-1122334455", status: "available" },
          ];
          setBooks(mockBooks);
          setTotalPages(1);
          setLoading(false);
          return;
        }
        const data = await res.json();

        setBooks(data.items || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        // Use mock data on error
        const mockBooks = [
          { id: 1, title: "Introduction to React", author: "John Doe", category: "Technology", isbn: "978-1234567890", status: "available" },
          { id: 2, title: "Advanced JavaScript", author: "Jane Smith", category: "Technology", isbn: "978-0987654321", status: "issued" },
          { id: 3, title: "Data Science Basics", author: "Mike Johnson", category: "Science", isbn: "978-1122334455", status: "available" },
        ];
        setBooks(mockBooks);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, [search, category, status, page]);

  return (
    <div className="p-6 min-h-screen bg-green-50">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-semibold text-green-800">Books List</h1>
          <button
            onClick={() => navigate("/library/books/add")}
            className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
          >
            + Add New Book
          </button>
        </header>

        {/* Filters Section */}
        <div className="bg-white p-4 rounded-xl shadow mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border border-green-100">
          <input
            type="text"
            placeholder="Search by title, author, ISBN..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg p-2 w-full"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded-lg p-2"
          >
            <option value="">All Categories</option>
            <option value="Science">Science</option>
            <option value="Technology">Technology</option>
            <option value="Engineering">Engineering</option>
            <option value="Mathematics">Mathematics</option>
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border rounded-lg p-2"
          >
            <option value="">All Status</option>
            <option value="available">Available</option>
            <option value="issued">Issued</option>
            <option value="damaged">Damaged</option>
            <option value="lost">Lost</option>
          </select>
        </div>

        {loading && <p className="text-gray-600">Loading books...</p>}
        {error && <p className="text-red-700 bg-red-100 p-2 rounded">{error}</p>}

        {/* Books Table */}
        {!loading && !error && (
          <div className="bg-white rounded-xl shadow border border-green-100 overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-green-100 text-green-900">
                <tr>
                  <th className="p-3">Title</th>
                  <th className="p-3">Author</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">ISBN</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book.id} className="border-t hover:bg-green-50">
                    <td className="p-3">{book.title}</td>
                    <td className="p-3">{book.author}</td>
                    <td className="p-3">{book.category}</td>
                    <td className="p-3">{book.isbn}</td>
                    <td className="p-3 capitalize">{book.status}</td>
                    <td className="p-3 flex gap-2">
                      <button
                        onClick={() => navigate(`/library/books/${book.id}`)}
                        className="text-green-700 hover:underline"
                      >
                        View
                      </button>
                      <button
                        onClick={() => navigate(`/library/books/edit/${book.id}`)}
                        className="text-blue-700 hover:underline"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-6 gap-4">
          <button
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>

          <span className="font-medium text-green-800">Page {page} of {totalPages}</span>

          <button
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
