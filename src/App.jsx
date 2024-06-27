import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from '@home'
import Login from '@login'
import Profile from '@profile'
import Error from '@error'
import './App.css'

function App() {
 

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Error />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
