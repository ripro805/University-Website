export default function DepartmentCard({ name, desc }) {
  return (
    <div className="p-6 bg-white shadow rounded hover:shadow-lg transition">
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}





