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
    <div className={`fixed bottom-4 left-0 w-full z-50 md:hidden flex justify-center items-center pointer-events-none transition-all ${showBar ? "animate-bounceInUp" : ""}`}>
      <div className="flex justify-around gap-6 w-[90%] pointer-events-auto">
        
        {/* User Icon */}
        <Link to="/auth" className="flex-1 flex justify-center">
          <div className="w-full max-w-[90px] bg-white/10 backdrop-blur-md p-3 rounded-2xl shadow-lg flex items-center justify-center hover:scale-105 transition-transform">
            <img src="/icons/user_m.png" alt="User" className="w-7 h-7" />
          </div>
        </Link>

        {/* Logo */}
        <Link to="/" className="flex-1 flex justify-center">
          <div className="w-full max-w-[90px] bg-white/10 backdrop-blur-md p-3 rounded-2xl shadow-lg flex items-center justify-center hover:scale-105 transition-transform">
            <img src="/logo.png" alt="Logo" className="w-7 h-7" />
          </div>
        </Link>

        {/* Cart Icon */}
        <div className="flex-1 flex justify-center relative">
          <div className="w-full max-w-[90px] bg-white/10 backdrop-blur-md p-3 rounded-2xl shadow-lg flex items-center justify-center hover:scale-105 transition-transform">
            <img src="/icons/carts.png" alt="Cart" className="w-7 h-7" />
          </div>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-[10px] rounded-full w-5 h-5 flex items-center justify-center shadow-md">
              {cartCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default MobileBottomBar;
