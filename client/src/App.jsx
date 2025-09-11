import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import AdminProtected from './components/adminAndUserRoute'
import ProtectedRoute from './components/protectedRoute'
import CreateCase from './components/caseForm'
import CasesPage from './pages/casePage'

const App = () => {
  return (
  <BrowserRouter>
     <Header/>
     <main>
       <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/cases' element={<AdminProtected>
          <CasesPage/>
        </AdminProtected>}/>
        <Route path='/caseform' element={<ProtectedRoute>
          <CreateCase/>
        </ProtectedRoute>}/>
       </Routes>
     </main>
     <Footer/>
  </BrowserRouter>
  )
}

export default App