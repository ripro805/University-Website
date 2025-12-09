import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function IssueBook() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);

  const [selectedUser, setSelectedUser] = useState("");
  const [selectedBook, setSelectedBook] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch all users
  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("/api/users?role=Student,Teacher");
        const data = await res.json();
        setUsers(data.users || []);
      } catch (err) {
        console.error("Failed to load users", err);
      }
    }

    fetchUsers();
  }, []);

  // Fetch all available books
  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await fetch("/api/books?status=Available");
        const data = await res.json();
        setBooks(data.books || []);
      } catch (err) {
        console.error("Failed to load books", err);
      }
    }

    fetchBooks();
  }, []);

  // Issue book submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedUser || !selectedBook || !issueDate || !dueDate) {
      alert("All fields are required");
      return;
    }

    setLoading(true);

    try {
      await fetch("/api/transactions/issue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: selectedUser,
          bookId: selectedBook,
          issueDate,
          dueDate,
        }),
      });

      navigate("/library/admin/transactions/issued-books");
    } catch (err) {
      console.error("Failed to issue book", err);
      alert("Issue failed");
    }

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-green-700 mb-6">Issue Book</h2>

      <form onSubmit={handleSubmit} className="bg-white shadow rounded-xl p-6 space-y-4">
        {/* Select User */}
        <div>
          <label className="block mb-1 font-medium">Select User</label>
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">-- Select User --</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name} ({user.role})
              </option>
            ))}
          </select>
        </div>

        {/* Select Book */}
        <div>
          <label className="block mb-1 font-medium">Select Book</label>
          <select
            value={selectedBook}
            onChange={(e) => setSelectedBook(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">-- Select Book --</option>
            {books.map((book) => (
              <option key={book._id} value={book._id}>
                {book.title} — {book.author}
              </option>
            ))}
          </select>
        </div>

        {/* Issue Date */}
        <div>
          <label className="block mb-1 font-medium">Issue Date</label>
          <input
            type="date"
            value={issueDate}
            onChange={(e) => setIssueDate(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Due Date */}
        <div>
          <label className="block mb-1 font-medium">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Issuing..." : "Issue Book"}
        </button>
      </form>
    </div>
  );
}
