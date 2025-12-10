import { useState } from "react";
import { booksDatabase, usersDatabase, issuedBooksDatabase, issueBook, returnBook, calculateFine } from "./libraryAdminData";

export default function IssueReturnSystem() {
  const [activeTab, setActiveTab] = useState("issue");
  const [message, setMessage] = useState({ type: "", text: "" });
  
  // Issue form state
  const [issueForm, setIssueForm] = useState({ bookId: "", studentId: "" });
  
  // Return form state
  const [returnForm, setReturnForm] = useState({ issueId: "" });
  
  // Get issued books
  const activeIssues = issuedBooksDatabase.filter(i => i.status === "issued" || i.status === "overdue");

  const handleIssue = (e) => {
    e.preventDefault();
    
    if (!issueForm.bookId || !issueForm.studentId) {
      setMessage({ type: "error", text: "Please select both book and student!" });
      return;
    }

    const result = issueBook(parseInt(issueForm.bookId), issueForm.studentId);
    
    if (result.success) {
      setMessage({ type: "success", text: "Book issued successfully!" });
      setIssueForm({ bookId: "", studentId: "" });
    } else {
      setMessage({ type: "error", text: result.message });
    }
    
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  const handleReturn = (e) => {
    e.preventDefault();
    
    if (!returnForm.issueId) {
      setMessage({ type: "error", text: "Please select an issue record!" });
      return;
    }

    const result = returnBook(parseInt(returnForm.issueId));
    
    if (result.success) {
      const fineMsg = result.fine > 0 ? ` Fine: ৳${result.fine}` : "";
      setMessage({ type: "success", text: `Book returned successfully!${fineMsg}` });
      setReturnForm({ issueId: "" });
    } else {
      setMessage({ type: "error", text: result.message });
    }
    
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  const availableBooks = booksDatabase.filter(b => b.available > 0);
  const activeUsers = usersDatabase.filter(u => u.status === "active");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-8 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold mb-2">Issue & Return System</h1>
          <p className="text-blue-100">Manage book circulation and track returns</p>
        </div>

        {/* Message */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-xl ${message.type === "success" ? "bg-green-100 text-green-800 border border-green-300" : "bg-red-100 text-red-800 border border-red-300"}`}>
            {message.text}
          </div>
        )}

        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab("issue")}
            className={`px-6 py-3 rounded-xl font-medium transition-colors ${activeTab === "issue" ? "bg-blue-600 text-white shadow-md" : "bg-white text-gray-700 hover:bg-gray-100"}`}
          >
            Issue Book
          </button>
          <button
            onClick={() => setActiveTab("return")}
            className={`px-6 py-3 rounded-xl font-medium transition-colors ${activeTab === "return" ? "bg-blue-600 text-white shadow-md" : "bg-white text-gray-700 hover:bg-gray-100"}`}
          >
            Return Book
          </button>
          <button
            onClick={() => setActiveTab("records")}
            className={`px-6 py-3 rounded-xl font-medium transition-colors ${activeTab === "records" ? "bg-blue-600 text-white shadow-md" : "bg-white text-gray-700 hover:bg-gray-100"}`}
          >
            Active Records
          </button>
        </div>

        {/* Issue Book Form */}
        {activeTab === "issue" && (
          <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Issue a Book</h2>
            <form onSubmit={handleIssue} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Book *</label>
                <select
                  value={issueForm.bookId}
                  onChange={(e) => setIssueForm({ ...issueForm, bookId: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Choose a book</option>
                  {availableBooks.map((book) => (
                    <option key={book.id} value={book.id}>
                      {book.name} - {book.author} (Available: {book.available})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Student *</label>
                <select
                  value={issueForm.studentId}
                  onChange={(e) => setIssueForm({ ...issueForm, studentId: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Choose a student</option>
                  {activeUsers.map((user) => (
                    <option key={user.studentId} value={user.studentId}>
                      {user.studentId} - {user.name} (Fine: ৳{user.fineAmount})
                    </option>
                  ))}
                </select>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> Books will be issued for 14 days. Fine: ৳5 per day after due date.
                </p>
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium shadow-md"
              >
                Issue Book
              </button>
            </form>
          </div>
        )}

        {/* Return Book Form */}
        {activeTab === "return" && (
          <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Return a Book</h2>
            <form onSubmit={handleReturn} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Issue Record *</label>
                <select
                  value={returnForm.issueId}
                  onChange={(e) => setReturnForm({ ...returnForm, issueId: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Choose an issue record</option>
                  {activeIssues.map((issue) => {
                    const fine = calculateFine(issue.dueDate);
                    return (
                      <option key={issue.id} value={issue.id}>
                        {issue.bookName} - {issue.studentName} (Due: {issue.dueDate}) {fine > 0 ? `[Fine: ৳${fine}]` : ""}
                      </option>
                    );
                  })}
                </select>
              </div>
              {returnForm.issueId && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  {(() => {
                    const issue = activeIssues.find(i => i.id === parseInt(returnForm.issueId));
                    if (issue) {
                      const fine = calculateFine(issue.dueDate);
                      return (
                        <div className="space-y-2 text-sm">
                          <p><strong>Book:</strong> {issue.bookName}</p>
                          <p><strong>Student:</strong> {issue.studentName} ({issue.studentId})</p>
                          <p><strong>Issue Date:</strong> {issue.issueDate}</p>
                          <p><strong>Due Date:</strong> {issue.dueDate}</p>
                          {fine > 0 && (
                            <p className="text-red-600 font-semibold">
                              <strong>Fine to be collected:</strong> ৳{fine}
                            </p>
                          )}
                        </div>
                      );
                    }
                    return null;
                  })()}
                </div>
              )}
              <button
                type="submit"
                className="w-full px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium shadow-md"
              >
                Return Book
              </button>
            </form>
          </div>
        )}

        {/* Active Records */}
        {activeTab === "records" && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Book Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Student</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Issue Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Due Date</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">Status</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">Fine</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {activeIssues.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                        No active issues
                      </td>
                    </tr>
                  ) : (
                    activeIssues.map((issue) => {
                      const fine = calculateFine(issue.dueDate);
                      const isOverdue = fine > 0;
                      return (
                        <tr key={issue.id} className="hover:bg-blue-50 transition-colors">
                          <td className="px-6 py-4 text-sm text-gray-800 font-medium">{issue.bookName}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {issue.studentName}<br />
                            <span className="text-xs text-gray-500">{issue.studentId}</span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">{issue.issueDate}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{issue.dueDate}</td>
                          <td className="px-6 py-4 text-sm text-center">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${isOverdue ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                              {isOverdue ? "Overdue" : "Issued"}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-center">
                            {fine > 0 ? (
                              <span className="text-red-600 font-semibold">৳{fine}</span>
                            ) : (
                              <span className="text-green-600">৳0</span>
                            )}
                          </td>
                        </tr>
                      );
                    })
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
