import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Landing from './pages/Landing'
import Jobs from './pages/Jobs'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import {  ToastContainer } from "react-toastify"

function App() {
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/jobs' element={<Jobs />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </div>
    
  )
}

export default App
