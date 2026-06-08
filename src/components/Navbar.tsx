const MENU = [
  { label: "Home", color: "#000000" },
  { label: "Studio", color: "#6F6F6F" },
  { label: "About", color: "#6F6F6F" },
  { label: "Journal", color: "#6F6F6F" },
  { label: "Reach Us", color: "#6F6F6F" },
];

export default function Navbar() {
  return (
    <nav className="relative z-10 flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
      {/* Logo */}
      <a
        href="#"
        className="text-3xl tracking-tight font-serif"
        style={{ color: "#000000" }}
      >
        Aethera<sup className="text-xs align-super">®</sup>
      </a>

      {/* Center menu */}
      <ul className="hidden md:flex items-center gap-10">
        {MENU.map((item) => (
          <li key={item.label}>
            <a
              href="#"
              className="text-sm transition-colors hover:opacity-70"
              style={{ color: item.color }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href="#"
        className="rounded-full px-6 py-2.5 text-sm transition-transform duration-300 hover:scale-[1.03]"
        style={{ backgroundColor: "#000000", color: "#FFFFFF" }}
      >
        Begin Journey
      </a>
    </nav>
  );
}
