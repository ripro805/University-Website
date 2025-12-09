import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function DepartmentDashboard() {
  const { slug } = useParams();
  const [dept, setDept] = useState(null);

  // Dummy department data
  const dummyDepartments = {
    "computer-science-engineering": {
      name: "Computer Science & Engineering",
      head: "Dr. Mahmud Hasan",
      email: "cse@gstu.edu",
      teachers: ["Teacher 1", "Teacher 2", "Teacher 3"],
    },
    "electrical-electronic-engineering": {
      name: "Electrical & Electronic Engineering",
      head: "Dr. Saiful Islam",
      email: "eee@gstu.edu",
      teachers: ["Teacher A", "Teacher B"],
    },
    physics: {
      name: "Physics",
      head: "Dr. Karim Mia",
      email: "physics@gstu.edu",
      teachers: ["Dr. X", "Dr. Y"],
    }
  };

  useEffect(() => {
    setDept(dummyDepartments[slug]); // fetch from dummy data
  }, [slug]);

  if (!dept) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl">Department Not Found</h1>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{dept.name}</h1>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2">Head of Department</h2>
        <p className="text-gray-700">Name: {dept.head}</p>
        <p className="text-gray-700">Email: {dept.email}</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow mt-6">
        <h2 className="text-xl font-semibold mb-2">Teachers</h2>
        <ul className="list-disc pl-6 text-gray-700">
          {dept.teachers.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
