import React, { useEffect, useState } from "react";

export default function UserDashboard() {
  const [booksIssued, setBooksIssued] = useState([]);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    // Fetch books issued to this user
    async function fetchIssuedBooks() {
      const res = await fetch("/api/transactions/my-issued");
      const data = await res.json();
      setBooksIssued(data || []);
    }

    // Fetch user reservations
    async function fetchReservations() {
      const res = await fetch("/api/reservations/my-reservations");
      const data = await res.json();
      setReservations(data || []);
    }

    fetchIssuedBooks();
    fetchReservations();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-green-700 mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="font-medium mb-3">Books Issued</h3>
          {booksIssued.length === 0 ? (
            <p>No books issued</p>
          ) : (
            <ul className="space-y-2">
              {booksIssued.map((book) => (
                <li key={book._id}>
                  {book.title} — Due: {new Date(book.dueDate).toLocaleDateString()}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="font-medium mb-3">Reservations</h3>
          {reservations.length === 0 ? (
            <p>No reservations</p>
          ) : (
            <ul className="space-y-2">
              {reservations.map((resv) => (
                <li key={resv._id}>
                  {resv.bookTitle} — Status: {resv.status}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
