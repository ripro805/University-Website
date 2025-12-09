export default function NoticeSection() {
  const notices = [
    "Orientation Program for New Students Announced",
    "Mid-term Exam Schedule Published",
    "Research Grant Applications Open Now",
  ];

  return (
    <section className="py-12 max-w-7xl mx-auto px-6">
      <h2 className="text-2xl font-bold mb-6">Latest Notices</h2>

      <div className="space-y-4">
        {notices.map((n, i) => (
          <div key={i} className="p-4 bg-white shadow rounded text-gray-700">
            {n}
          </div>
        ))}
      </div>
    </section>
  );
}
