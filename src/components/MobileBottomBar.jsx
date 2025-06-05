import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MobileBottomBar({ cartCount = 0 }) {
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = document.querySelector("#hero")?.offsetHeight || 300;
      setShowBar(window.scrollY > heroHeight * 0.7);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!showBar) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 md:hidden bg-white/10 backdrop-blur-lg py-3 px-6 flex justify-between items-center text-yellow-400">
      {/* Logo */}
      <Link to="/" className="flex-1 flex justify-start">
        <img
          src="/logo.png"
          alt="Logo"
          className="w-6 h-6 hover:scale-110 transition-transform"
        />
      </Link>

      {/* User Icon */}
      <Link to="/auth" className="flex-1 flex justify-center">
        <img
          src="/icons/user.png"
          alt="User"
          className="w-6 h-6 hover:scale-110 transition-transform"
        />
      </Link>

      {/* Cart Icon */}
      <div className="flex-1 flex justify-end relative">
        <img
          src="/icons/cart.png"
          alt="Cart"
          className="w-6 h-6 hover:scale-110 transition-transform"
        />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </div>
    </div>
  );
}

export default MobileBottomBar;
