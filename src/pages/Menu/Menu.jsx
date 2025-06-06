import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from '../../components/Header'
import Hero from '../../components/Hero'
import MenuSection from '../../components/MenuSection'
import Footer from '../../components/Footer'
import Auth from './Auth'
import MobileBottomBar from '../../components/MobileBottomBar'
import menuData from '../../data/menu.json'

function Menu() {
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])

  // Funzione per aggiungere prodotto al carrello
  const addToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) {
        // Aggiorna quantità
        return prev.map(i => i.id === item.id ? {...i, quantity: i.quantity + 1} : i)
      } else {
        return [...prev, {...item, quantity: 1}]
      }
    })
  }

  // Funzione per rimuovere prodotto dal carrello
  const removeItem = (id) => {
    setCartItems((prev) => prev.filter(i => i.id !== id))
  }

  const totalPrice = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <>
      <Header
        cartCount={cartCount}
        cartItems={cartItems}
        removeItem={removeItem}
        totalPrice={totalPrice}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
      />

      <Routes>
        <Route
          path="/"
          element={
            <div
              className={`pt-20 pb-20 transition-all duration-500 ${
                cartOpen ? 'md:pr-[360px]' : ''
              }`}
            >
              <Hero />
              {Object.entries(menuData).map(([section, items]) => (
                <MenuSection
                  key={section}
                  title={section}
                  items={items}
                  cartOpen={cartOpen}
                  addToCart={addToCart}
                />
              ))}
              <Footer />
            </div>
          }
        />
        <Route path="/auth" element={<Auth />} />
      </Routes>

      <MobileBottomBar
        cartCount={cartCount}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        cartItems={cartItems}
        removeItem={removeItem}
        addToCart={addToCart}
      />
    </>
  )
}

export default Menu
