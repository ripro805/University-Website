import React, { useEffect, useState } from "react";

export default function IssuedBooksList() {
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchIssuedBooks() {
      try {
        const res = await fetch(`/api/transactions/issued?page=${page}&search=${search}`);
        const data = await res.json();
        setIssuedBooks(data.books || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error("Failed to fetch issued books", err);
      }
    }

    fetchIssuedBooks();
  }, [page, search]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-green-700 mb-6">Issued Books</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by book or user"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-full md:w-1/3"
        />
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full text-left">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-3">Book</th>
              <th className="p-3">User</th>
              <th className="p-3">Issue Date</th>
              <th className="p-3">Due Date</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {issuedBooks.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No issued books found
                </td>
              </tr>
            ) : (
              issuedBooks.map((item) => (
                <tr key={item._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{item.bookTitle}</td>
                  <td className="p-3">{item.userName}</td>
                  <td className="p-3">{new Date(item.issueDate).toLocaleDateString()}</td>
                  <td className="p-3">{new Date(item.dueDate).toLocaleDateString()}</td>
                  <td className="p-3 font-medium">
                    {new Date() > new Date(item.dueDate) ? (
                      <span className="text-red-600">Late</span>
                    ) : (
                      <span className="text-green-600">On Time</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-6 gap-4">
        <button
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2 font-medium">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
