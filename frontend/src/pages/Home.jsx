import Hero from "../components/Hero";
import NoticeSection from "../components/NoticeSection";
import DepartmentCard from "../components/DepartmentCard";

export default function Home() {
  const departments = [
    { name: "Computer Science & Engineering", desc: "Modern computing and AI research." },
    { name: "Electrical Engineering", desc: "Power systems & electronics." },
    { name: "Business Administration", desc: "Management & finance." },
  ];

  return (
    <>
      <Hero />
      <NoticeSection />

      <section className="py-12 max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-bold mb-6">Departments</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {departments.map((d, i) => (
            <DepartmentCard key={i} name={d.name} desc={d.desc} />
          ))}
        </div>
      </section>
    </>
  );
}





