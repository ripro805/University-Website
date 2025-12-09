// File: frontend/src/pages/library/books/AddBook.jsx
// Add Book Form – Supports image upload, full metadata, validation
// TailwindCSS + Hooks + API placeholders

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddBook() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    author: "",
    edition: "",
    category: "",
    isbn: "",
    publisher: "",
    status: "available",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setForm((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      const res = await fetch("/api/books", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to add book");

      navigate("/library/admin/books");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow border border-green-100">
        <h1 className="text-3xl font-semibold text-green-800 mb-6">Add New Book</h1>

        {error && <p className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block mb-1 font-medium">Book Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="border rounded-lg p-2 w-full"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Author</label>
            <input
              type="text"
              name="author"
              value={form.author}
              onChange={handleChange}
              required
              className="border rounded-lg p-2 w-full"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Edition</label>
            <input
              type="text"
              name="edition"
              value={form.edition}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full"
              required
            >
              <option value="">Select Category</option>
              <option value="Science">Science</option>
              <option value="Technology">Technology</option>
              <option value="Engineering">Engineering</option>
              <option value="Mathematics">Mathematics</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">ISBN</label>
            <input
              type="text"
              name="isbn"
              value={form.isbn}
              onChange={handleChange}
              required
              className="border rounded-lg p-2 w-full"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Publisher</label>
            <input
              type="text"
              name="publisher"
              value={form.publisher}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full"
            >
              <option value="available">Available</option>
              <option value="damaged">Damaged</option>
              <option value="lost">Lost</option>
            </select>
          </div>

          <div className="col-span-2">
            <label className="block mb-1 font-medium">Book Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="border rounded-lg p-2 w-full"
            />
          </div>

          <div className="col-span-2 flex justify-end mt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
