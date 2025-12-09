export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-6 mt-10">
      <div className="max-w-7xl mx-auto text-center">
        <p>© {new Date().getFullYear()} Gopalganj Science & Technology University</p>
        <p className="text-sm mt-2">Designed & Developed by Web Dev Team</p>
      </div>
    </footer>
  );
}