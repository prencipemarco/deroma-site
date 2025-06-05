import React from "react";
import { FaCartPlus } from "react-icons/fa";

function MenuSection({ title, items }) {
  return (
    <section
      id={title.toLowerCase().replace(/\s/g, "-")}
      className="-mt-6 mb-12 px-4 max-w-screen-xl mx-auto"

    >
      <h2 className="menu-section-title text-yellow-400 text-3xl font-bold mb-8 text-center">
        {title}
      </h2>

      <div className="grid gap-6 grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))]">

        {items.map((item, index) => (
          <div
            key={index}
            className="relative bg-[#1e1e1e] text-yellow-300 shadow-lg rounded-xl overflow-hidden p-4"
          >
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
            )}
            <h4 className="text-xl font-semibold text-yellow-400 mb-1">{item.name}</h4>
            <p className="text-sm italic mb-1">{item.ingredients}</p>
            <p className="text-sm mb-2">{item.description}</p>
            <p className="font-bold text-yellow-500 mb-8">
              {item.price.toFixed(2)} €
            </p>

            {/* Pulsante carrello */}
            <button className="absolute bottom-4 right-4 bg-yellow-500 text-black p-2 rounded-full hover:bg-yellow-400 transition-all">
              <FaCartPlus size={18} />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MenuSection;
