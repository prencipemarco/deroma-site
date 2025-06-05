import { Routes, Route } from 'react-router-dom'
import Header from '../../components/Header'
import Hero from '../../components/Hero'
import MenuSection from '../../components/MenuSection'
import Footer from '../../components/Footer'
import Auth from './Auth'
import menuData from '../../data/menu.json'

function Menu() {
  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <div className="pt-20">
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
    </>
  )
}

export default Menu
