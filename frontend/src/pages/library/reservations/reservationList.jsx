import { useEffect, useState } from "react";

export default function ReservationList() {
  const [reservations, setReservations] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch reservations
  useEffect(() => {
    async function fetchReservations() {
      try {
        const res = await fetch(`/api/reservations?page=${page}&status=${statusFilter}&search=${search}`);
        const data = await res.json();

        setReservations(data.reservations || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error("Failed to fetch reservations", err);
      }
    }

    fetchReservations();
  }, [page, statusFilter, search]);

  // Approve or reject reservation
  const updateStatus = async (id, newStatus) => {
    try {
      await fetch(`/api/reservations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      setReservations((prev) =>
        prev.map((resv) => (resv._id === id ? { ...resv, status: newStatus } : resv))
      );
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-green-700 mb-6">Reservations</h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by user or book"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-full md:w-1/3"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border rounded w-full md:w-1/4"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Reservations Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full text-left">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-3">User</th>
              <th className="p-3">Book</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {reservations.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No reservations found
                </td>
              </tr>
            ) : (
              reservations.map((item) => (
                <tr key={item._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{item.user?.name}</td>
                  <td className="p-3">{item.book?.title}</td>
                  <td className="p-3">{new Date(item.date).toLocaleDateString()}</td>
                  <td className="p-3 font-medium">
                    {item.status === "Pending" && (
                      <span className="text-yellow-600">Pending</span>
                    )}
                    {item.status === "Approved" && (
                      <span className="text-green-600">Approved</span>
                    )}
                    {item.status === "Cancelled" && (
                      <span className="text-red-600">Cancelled</span>
                    )}
                  </td>

                  <td className="p-3 text-right space-x-3">
                    {item.status === "Pending" && (
                      <>
                        <button
                          onClick={() => updateStatus(item._id, "Approved")}
                          className="text-green-600 hover:underline"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() => updateStatus(item._id, "Cancelled")}
                          className="text-red-600 hover:underline"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
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
