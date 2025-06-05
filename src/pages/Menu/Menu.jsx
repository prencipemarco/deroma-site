import { Routes, Route } from 'react-router-dom'
import Header from '../../components/Header'
import Hero from '../../components/Hero'
import MenuSection from '../../components/MenuSection'
import Footer from '../../components/Footer'
import Auth from './Auth'
import MobileBottomBar from '../../components/MobileBottomBar' // <== importa qui
import menuData from '../../data/menu.json'

function Menu() {
  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <div className="pt-20 pb-20"> {/* <== spazio extra sotto per non coprire il contenuto */}
              <Hero />
              {Object.entries(menuData).map(([section, items]) => (
                <MenuSection key={section} title={section} items={items} />
              ))}

              <Footer />
            </div>
          }
        />
        <Route path="/auth" element={<Auth />} />
      </Routes>

      {/* Barra mobile in basso */}
      <MobileBottomBar cartCount={0} /> {/* Puoi collegare il count al tuo stato globale/cart */}
    </>
  )
}

export default Menu
