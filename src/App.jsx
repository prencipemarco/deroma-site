import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Menu from './pages/Menu/Menu'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Menu />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
