import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import './bootstrap.min.css'
import { Container } from 'react-bootstrap'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { TokenContextProvider } from './context/tokenContext'
import PrivateRoute from './components/PrivateRoute'
import PageNotFound from './pages/PageNotFound'
import { ProfileContextProvider } from './context/profilContext'
import ProfilePage from './pages/Profile'

const App = () => {
  return (
    <BrowserRouter>
      <TokenContextProvider>
        <ProfileContextProvider>
          <Header />
          <main>
            <Container>
              <Routes>
                <Route path="*" element={<PageNotFound />} />
                <Route element={<PrivateRoute />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/profile" element={<ProfilePage />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </Container>
          </main>
          <Footer />
        </ProfileContextProvider>
      </TokenContextProvider>
    </BrowserRouter>
  )
}

export default App
