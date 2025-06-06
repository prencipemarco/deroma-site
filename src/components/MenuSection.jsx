import React, { useState } from "react";
import { FaHeart, FaCartPlus, FaTimes } from "react-icons/fa";

function MenuSection({ title, items, cartOpen, addToCart }) {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <section
      id={title.toLowerCase().replace(/\s/g, "-")}
      className={`-mt-6 mb-12 px-4 max-w-screen-xl mx-auto transition-all duration-500 ${
        cartOpen ? "md:mr-[360px]" : ""
      }`}
    >
      <h2 className="menu-section-title text-yellow-400 text-3xl font-bold mb-8 text-center">
        {title}
      </h2>

      <div className="grid gap-6 grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))]">
        {items.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelectedItem(item)}
            className="cursor-pointer relative bg-[#1e1e1e] text-yellow-300 shadow-lg rounded-xl overflow-hidden p-4 transition-transform hover:scale-[1.02]"
          >
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}
            <h4 className="text-xl font-semibold text-yellow-400 mb-1">
              {item.name}
            </h4>
            <p className="text-sm italic mb-1">{item.ingredients}</p>
            <p className="text-sm mb-2">{item.description}</p>
            <p className="font-bold text-yellow-500">{item.price.toFixed(2)} €</p>
          </div>
        ))}
      </div>

      {/* MODALE */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1e1e1e]/70 backdrop-blur-xl text-yellow-300 p-6 rounded-xl max-w-md w-full shadow-2xl relative">
            {selectedItem.image && (
              <img
                src={selectedItem.image}
                alt={selectedItem.name}
                className="w-full h-60 object-cover rounded-lg mb-4"
              />
            )}
            <h4 className="text-2xl font-bold text-yellow-400 mb-2">
              {selectedItem.name}
            </h4>
            <p className="text-sm italic mb-1">{selectedItem.ingredients}</p>
            <p className="text-sm mb-3">{selectedItem.description}</p>
            <p className="font-bold text-yellow-500 text-lg">
              {selectedItem.price.toFixed(2)} €
            </p>

            {/* Bottoni azione */}
            <div className="mt-6 flex justify-between">
              <button
                onClick={() => console.log("Aggiunto ai preferiti")}
                className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-black text-xs font-bold rounded-full hover:bg-yellow-400"
              >
                <FaHeart /> Preferiti
              </button>
              <button
                onClick={() => setSelectedItem(null)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white text-xs font-bold rounded-full hover:bg-gray-600"
              >
                <FaTimes /> Chiudi
              </button>
              <button
                onClick={() => {
                  addToCart(selectedItem);
                  setSelectedItem(null);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-black text-xs font-bold rounded-full hover:bg-yellow-400"
              >
                <FaCartPlus /> Carrello
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default MenuSection;
