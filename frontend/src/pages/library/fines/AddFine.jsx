import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AddFine() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedBook, setSelectedBook] = useState("");
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch users and books
  useEffect(() => {
    async function fetchData() {
      try {
        const usersRes = await fetch("/api/users");
        const usersData = await usersRes.json();
        setUsers(usersData.users || []);

        const booksRes = await fetch("/api/books");
        const booksData = await booksRes.json();
        setBooks(booksData.books || []);
      } catch (err) {
        console.error("Failed to fetch users/books", err);
      }
    }

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedUser || !selectedBook || amount <= 0) {
      alert("All fields are required and amount must be greater than 0");
      return;
    }

    setLoading(true);

    try {
      await fetch("/api/fines", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: selectedUser,
          bookId: selectedBook,
          amount,
        }),
      });

      alert("Fine added successfully");
      navigate("/library/admin/fines");
    } catch (err) {
      console.error("Failed to add fine", err);
      alert("Failed to add fine");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-green-700 mb-6">Add Fine</h2>

      <form onSubmit={handleSubmit} className="bg-white shadow rounded-xl p-6 space-y-4">
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

        <div>
          <label className="block mb-1 font-medium">Amount (Tk)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border rounded"
            min={1}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Fine"}
        </button>
      </form>
    </div>
  );
}

