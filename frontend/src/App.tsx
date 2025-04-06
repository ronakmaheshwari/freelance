import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Landing from './pages/Landing'
import Jobs from './pages/Jobs'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import {  ToastContainer } from "react-toastify"
import CompanySignup from './pages/CompanySignup'
import AdminSignin from './pages/AdminSignin'

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
          <Route path='/admin/signup' element={<CompanySignup />} />
          <Route path='/admin/signin' element={<AdminSignin />} />
        </Routes>
      </BrowserRouter>
    </div>
    
  )
}

export default App
