import React from "react"
import { Link } from "react-router-dom"

function Header({ cartCount = 0 }) {
  return (
    <header className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-transparent text-yellow-400">
      {/* LOGO */}
      <Link to="/">
        <img
            src="/logo.png"
            alt="Logo"
            className="w-6 h-6 hover:scale-110 transition-transform"
          />
      </Link>

      {/* ICONE UTENTE + CARRELLO */}
      <div className="flex items-center gap-6">
        {/* Icona utente */}
        <Link to="/auth">
          <img
            src="/icons/user.png"
            alt="User"
            className="w-6 h-6 hover:scale-110 transition-transform"
          />
        </Link>

        {/* Icona carrello con badge */}
        <div className="relative">
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
    </header>
  )
}

export default Header
