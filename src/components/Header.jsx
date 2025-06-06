import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const sections = [
  "Pinse Rosse",
  "Pinse Bianche",
  "Pinse Romane",
  "Pinse Dolci",
  "Hamburger",
  "Friggitoria",
  "Bevande",
];

function Header({ cartCount = 0, cartItems = [], removeItem, totalPrice = 0 }) {
  const [showHeader, setShowHeader] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [cartOpen, setCartOpen] = useState(false);

  const toggleCart = () => setCartOpen(!cartOpen);

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
    <>
      {/* Header principale */}
      <header
        className={`fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center transition-all duration-500 ${
          showHeader
            ? "bg-white/10 backdrop-blur-lg border-b border-white/20 shadow-md text-yellow-400"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Logo */}
        <Link to="/" className="ml-10 md:block hidden">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-10 h-10 hover:scale-110 transition-transform"
          />
        </Link>

        {/* Menu centrale */}
        <nav
          className="flex md:gap-3 gap-1 text-sm font-medium tracking-wide overflow-x-auto scrollbar-none md:overflow-visible px-1 transition-all duration-300"
        >
          {sections.map((section) => {
            const id = section.toLowerCase().replace(/\s/g, "-");
            const isActive = activeSection === section;

            return (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-full transition-all duration-300 flex-shrink-0
                ${
                  isActive
                    ? "bg-yellow-400 text-black shadow-md"
                    : "bg-transparent text-yellow-400 hover:bg-yellow-400 hover:text-black"
                }`}
              >
                {section}
              </button>
            );
          })}
        </nav>

        {/* Icone a destra */}
        <div className="items-center gap-6 md:flex hidden">
          <Link to="/auth">
            <img
              src="/icons/user_m.png"
              alt="User"
              className="w-7 h-7 hover:scale-110 transition-transform"
            />
          </Link>

          <div className="relative cursor-pointer" onClick={toggleCart}>
            <img
              src={cartOpen ? "/icons/remove.png" : "/icons/carts.png"}
              alt="Cart"
              className="mr-10 w-7 h-7 hover:scale-110 transition-transform"
            />
            {cartCount > 0 && !cartOpen && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Cart Panel laterale */}
      <AnimatePresence>
        {cartOpen && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[72px] right-0 h-[calc(100vh-72px)] w-[340px] bg-black/70 backdrop-blur-lg z-40 shadow-xl px-5 py-4 overflow-y-auto rounded-l-xl"
          >
            <h3 className="text-yellow-400 text-xl font-bold mb-4 text-center">Carrello</h3>

            {cartItems.length === 0 ? (
              <p className="text-gray-400 text-center">Carrello vuoto</p>
            ) : (
              <ul className="space-y-3">
                {cartItems.map((item, i) => (
                  <li
                    key={i}
                    className="flex justify-between items-center bg-white/10 rounded p-2 shadow-inner"
                  >
                    <span>{item.name}</span>
                    <div className="flex items-center gap-3">
                      <span>{item.quantity}× {item.price.toFixed(2)}€</span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 font-bold text-xl leading-none hover:text-red-400"
                        aria-label={`Rimuovi ${item.name}`}
                      >
                        ×
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {/* Totale */}
            <div className="mt-4 border-t border-yellow-400 pt-4 flex justify-between text-yellow-400 font-semibold text-lg">
              <span>Totale:</span>
              <span>{totalPrice.toFixed(2)}€</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
