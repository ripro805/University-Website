import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ReturnBook = () => {
  const navigate = useNavigate();

  const [issuedBooks, setIssuedBooks] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [fine, setFine] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch issued books list
  const fetchIssuedBooks = async () => {
    try {
      const res = await fetch("/api/transactions/issued");
      const data = await res.json();
      setIssuedBooks(data);
    } catch (error) {
      console.error("Error fetching issued books", error);
    }
  };

  useEffect(() => {
    fetchIssuedBooks();
  }, []);

  // Handle selection
  const handleSelectIssue = (e) => {
    const issue = issuedBooks.find((item) => item._id === e.target.value);
    setSelectedIssue(issue);

    if (issue) calculateFine(issue);
  };

  // Fine Calculation
  const calculateFine = (issue) => {
    const due = new Date(issue.dueDate);
    const today = new Date();

    const diffTime = today - due;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 0) setFine(diffDays * 10); // 10 tk per day
    else setFine(0);
  };

  // Submit Return
  const handleReturn = async (e) => {
    e.preventDefault();
    if (!selectedIssue) return;

    setLoading(true);

    try {
      const res = await fetch(`/api/transactions/return/${selectedIssue._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fine }),
      });

      if (res.ok) {
        alert("Book returned successfully");
        navigate("/library/admin/issued-books");
      }
    } catch (error) {
      console.error("Return error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-green-700">Return Book</h2>

      {/* Select Issued Record */}
      <div className="bg-white p-5 rounded-lg shadow">
        <label className="block font-medium mb-2">Select Issued Book</label>
        <select
          onChange={handleSelectIssue}
          className="w-full border p-2 rounded"
        >
          <option value="">-- Select Issued Record --</option>
          {issuedBooks.map((item) => (
            <option key={item._id} value={item._id}>
              {item.bookTitle} — {item.userName}
            </option>
          ))}
        </select>
      </div>

      {selectedIssue && (
        <div className="mt-6 bg-white p-5 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-3">Issued Details</h3>

          <p><strong>Book:</strong> {selectedIssue.bookTitle}</p>
          <p><strong>User:</strong> {selectedIssue.userName}</p>
          <p><strong>Issued Date:</strong> {selectedIssue.issueDate}</p>
          <p><strong>Due Date:</strong> {selectedIssue.dueDate}</p>

          <div className="mt-3">
            <label className="font-medium">Fine Amount (calculated):</label>
            <input
              type="number"
              className="w-full border p-2 rounded mt-2"
              value={fine}
              onChange={(e) => setFine(e.target.value)}
              readOnly
            />
          </div>

          <button
            onClick={handleReturn}
            disabled={loading}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
          >
            {loading ? "Processing..." : "Confirm Return"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ReturnBook;
