import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const sections = [
  "Pinse Rosse",
  "Pinse Bianche",
  "Pinse Romane",
  "Pinse Dolci",
  "Hamburger",
  "Friggitoria",
  "Bevande",
];

function Header({ cartCount = 0 }) {
  const [showHeader, setShowHeader] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = document.querySelector("#hero")?.offsetHeight || 300;
      setShowHeader(window.scrollY > heroHeight * 0.7);

      for (const section of sections) {
        const el = document.getElementById(section.toLowerCase().replace(/\s/g, "-"));
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 80 && rect.bottom >= 80) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center transition-all duration-500 ${
        showHeader
          ? "bg-white/10 backdrop-blur-lg border-b border-white/20 shadow-md text-yellow-400"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {/* LOGO */}
      <Link to="/">
        <img
          src="/logo.png"
          alt="Logo"
          className="ml-10 w-10 h-10 hover:scale-110 transition-transform"
        />
      </Link>

      {/* MENU CENTRALE */}
      {/* MENU CENTRALE */}
<nav className="flex md:gap-6 gap-2 text-sm font-semibold overflow-x-auto scrollbar-none md:overflow-visible px-1">
  {sections.map((section) => {
    const id = section.toLowerCase().replace(/\s/g, "-");
    const isActive = activeSection === section;

    return (
      <button
        key={id}
        onClick={() => scrollToSection(id)}
        className={`whitespace-nowrap px-4 py-2 rounded-full transition-all duration-300 flex-shrink-0
          ${
            isActive
              ? "bg-yellow-400 text-black"
              : "bg-transparent text-yellow-400 hover:bg-yellow-400 hover:text-black"
          }`}
      >
        {section}
      </button>
    );
  })}
</nav>


      {/* ICONE UTENTE + CARRELLO */}
      <div className="flex items-center gap-6">
        <Link to="/auth">
          <img
            src="/icons/user_m.png"
            alt="User"
            className="w-8 h-8 hover:scale-110 transition-transform"
          />
        </Link>

        <div className="relative">
          <img
            src="/icons/carts.png"
            alt="Cart"
            className="mr-10 w-8 h-8 hover:scale-110 transition-transform"
          />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
