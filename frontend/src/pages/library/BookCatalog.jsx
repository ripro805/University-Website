import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { categories } from "./libraryData";
import { Search, ArrowLeft } from "lucide-react";

const API_URL = "http://localhost:5000/api";

export default function BookCatalog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, [selectedCategory, searchQuery]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      let url = `${API_URL}/library/books?limit=100`;
      
      if (searchQuery) {
        url += `&search=${encodeURIComponent(searchQuery)}`;
      }
      
      if (selectedCategory !== "All") {
        url += `&category=${encodeURIComponent(selectedCategory)}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setBooks(data.data);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const availableCount = books.filter(book => book.available > 0).length;

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <Link to="/library" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 font-medium">
          <ArrowLeft size={20} className="mr-2" />
          Back to Library Home
        </Link>

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl p-8 mb-6 shadow-lg">
          <h1 className="text-4xl font-bold mb-2">Book Catalog</h1>
          <p className="text-blue-100">Browse and search our extensive collection</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white shadow-md rounded-2xl p-6 mb-6 border border-gray-200">
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            {/* Search Bar */}
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by title or author..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-600 mb-1">Total Books</p>
              <p className="text-3xl font-bold text-blue-700">{books.length}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <p className="text-sm text-gray-600 mb-1">Available</p>
              <p className="text-3xl font-bold text-green-700">{availableCount}</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <p className="text-sm text-gray-600 mb-1">Not Available</p>
              <p className="text-3xl font-bold text-red-700">{books.length - availableCount}</p>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white shadow-md rounded-2xl p-8 text-center">
            <p className="text-gray-600">Loading books...</p>
          </div>
        )}

        {/* Books Table */}
        {!loading && (
          <div className="bg-white shadow-md rounded-2xl overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Title</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Author</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Category</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">ISBN</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Available/Total</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {books.length > 0 ? (
                    books.map((book) => (
                      <tr key={book._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <p className="font-semibold text-gray-800">{book.name}</p>
                        </td>
                        <td className="px-6 py-4 text-gray-700">{book.author}</td>
                        <td className="px-6 py-4">
                          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm font-medium">
                            {book.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600 text-sm">{book.isbn}</td>
                        <td className="px-6 py-4 text-center">
                          <span className="font-semibold text-gray-700">{book.available} / {book.quantity}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded text-sm font-semibold ${
                            book.available > 0
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}>
                            {book.available > 0 ? "Available" : "Not Available"}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                        No books found matching your search criteria.
                      </td>
                    </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
