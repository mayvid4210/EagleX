"use client";

export default function Navbar() {
  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between bg-neutral-900 border-b border-neutral-700">
      <h1 className="text-2xl font-bold">EAGLEX</h1>

      <div className="flex items-center gap-6">
        <a href="/" className="hover:text-blue-400">Home</a>
        <a href="/team-builder" className="hover:text-blue-400">Team Builder</a>
        <a href="/race" className="hover:text-blue-400">Race</a>
        <a href="/analysis" className="hover:text-blue-400">AI Analysis</a>
        <a href="/neurodrive" className="hover:text-blue-400">NeuroDrive</a>
      </div>
    </nav>
  );
}
