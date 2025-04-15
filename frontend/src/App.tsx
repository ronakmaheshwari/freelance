import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Landing from './pages/Landing'
// import Jobs from './pages/Jobs'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import {  ToastContainer } from "react-toastify"
import CompanySignup from './pages/CompanySignup'
import AdminSignin from './pages/AdminSignin'
import Dashboard from './pages/Dashboard'
import UpdateProfile from './pages/UpdatePage'
import Applied from './pages/UserApplied'
import Apply from './components/custom/Apply/apply'
import AdminPage from './components/custom/Admin/AdminPage'
import AdminCreateJob from './components/custom/Admin/AdminCreateJob'
import CompanyJobPage from './components/custom/Admin/CompanyPage'
import AdminJob from './components/custom/Admin/AdminJobs'
import SelectionPage from './components/custom/Admin/Selection'


function App() {
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/jobs' element={<Dashboard />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/apply/:jobId' element={<Apply />} />
          <Route path='/update' element={<UpdateProfile />} />
          <Route path='/applied' element={<Applied />} />
          <Route path='/admin/signup' element={<CompanySignup />} />
          <Route path='/admin/signin' element={<AdminSignin />} />
          <Route path='/admin/dashboard' element={<AdminPage />} />
          <Route path='/admin/create' element={<AdminCreateJob />} />
          <Route path='/admin/companyjob' element={<CompanyJobPage />} />
          <Route path='/admin/adminjob' element={<AdminJob />} />
          <Route path='/admin/adminjob/:jobId' element={<SelectionPage />} />
        </Routes>
      </BrowserRouter>
    </div>
    
  )
}

export default App
