export default function Hero() {
  return (
    <section
      className="h-[70vh] bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/src/assets/hero.jpg')" }}
    >
      <div className="bg-black bg-opacity-50 p-10 rounded-xl text-white text-center">
        <h1 className="text-4xl font-bold mb-4">
          Gopalganj Science & Technology University
        </h1>
        <p className="text-lg">Committed to Quality Education & Research</p>
      </div>
    </section>
  );
}
