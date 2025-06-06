import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function MobileBottomBar({ 
  cartCount = 0, 
  cartItems = [], 
  removeItem, 
  totalPrice = 0,
  cartOpen,
  setCartOpen
}) {
  const cartRef = useRef(null);

  const toggleCart = () => setCartOpen(!cartOpen);

  useEffect(() => {
    function handleClickOutside(event) {
      if (cartOpen && cartRef.current && !cartRef.current.contains(event.target)) {
        setCartOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cartOpen, setCartOpen]);

  return (
    <>
      {/* Barra bottom */}
      <div className="fixed bottom-4 left-0 w-full z-50 md:hidden flex justify-center pointer-events-none">
        <div className="flex justify-around gap-6 w-[90%] pointer-events-auto relative">
          
          {/* Logo */}
          <div className="flex-1 flex justify-center">
            <Link to="/" className="w-full max-w-[90px] bg-black/10 backdrop-blur-md p-3 rounded-2xl shadow-lg flex items-center justify-center hover:scale-105 transition-transform">
              <img src="/logo.png" alt="Logo" className="w-7 h-7" />
            </Link>
          </div>
          
          {/* Cart - cambia immagine quando aperto */}
          <motion.button
            onClick={toggleCart}
            className="flex-1 flex justify-center cursor-pointer relative"
            whileTap={{ scale: 0.9 }}
          >
            <div className="w-full max-w-[90px] bg-black/10 backdrop-blur-md p-3 rounded-2xl shadow-lg flex items-center justify-center hover:scale-105 transition-transform">
              {cartOpen ? (
                <img
                  src="/icons/remove.png" // icona X
                  alt="Chiudi"
                  className="w-7 h-7 select-none"
                />
              ) : (
                <>
                  <img src="/icons/carts.png" alt="Carrello" className="w-7 h-7" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-[10px] rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                      {cartCount}
                    </span>
                  )}
                </>
              )}
            </div>
          </motion.button>

          {/* User */}
          <div className="flex-1 flex justify-center">
            <Link to="/auth" className="w-full max-w-[90px] bg-black/10 backdrop-blur-md p-3 rounded-2xl shadow-lg flex items-center justify-center hover:scale-105 transition-transform">
              <img src="/icons/user_m.png" alt="User" className="w-7 h-7" />
            </Link>
          </div>
        </div>
      </div>

      {/* Card Carrello */}
      {cartOpen && (
        <div
          ref={cartRef}
          className="fixed bottom-[88px] left-0 right-0 mx-auto w-[93vw] max-h-[120vh] bg-black/10 backdrop-blur-md rounded-xl shadow-lg overflow-y-auto z-50 px-4 py-4"
        >
          <h3 className="text-yellow-400 text-xl font-bold mb-4 text-center">Carrello</h3>

          {/* Lista articoli */}
          {cartItems.length === 0 ? (
            <p className="text-gray-400 text-center">Carrello vuoto</p>
          ) : (
            <ul className="space-y-3">
              {cartItems.map((item) => (
                <li
                  key={item.id}
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
        </div>
      )}
    </>
  );
}

export default MobileBottomBar;
