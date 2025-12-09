import { useEffect, useState } from "react";

export default function FinesList() {
  const [fines, setFines] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchFines() {
      try {
        const res = await fetch(`/api/fines?page=${page}&search=${search}`);
        const data = await res.json();
        setFines(data.fines || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error("Failed to fetch fines", err);
      }
    }

    fetchFines();
  }, [page, search]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-green-700 mb-6">Fines</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by user or book"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-full md:w-1/3"
        />
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full text-left">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-3">User</th>
              <th className="p-3">Book</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {fines.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No fines found
                </td>
              </tr>
            ) : (
              fines.map((fine) => (
                <tr key={fine._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{fine.userName}</td>
                  <td className="p-3">{fine.bookTitle}</td>
                  <td className="p-3">{fine.amount}</td>
                  <td className="p-3 font-medium">
                    {fine.paid ? (
                      <span className="text-green-600">Paid</span>
                    ) : (
                      <span className="text-red-600">Pending</span>
                    )}
                  </td>
                  <td className="p-3">{new Date(fine.date).toLocaleDateString()}</td>
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
