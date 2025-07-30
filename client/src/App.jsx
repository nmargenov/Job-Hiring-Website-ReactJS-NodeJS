import './App.css'
import { Login } from './components/Auth/Login/Login'
import { VerifyLoginCode } from './components/Auth/VerifyLoginCode/VerifyLoginCode'
import { CookieConsentModal } from './components/CookieConsentModal.jsx/CookieConsentModal'
import { Header } from './components/Header/Header'
import { AuthProvider } from './contexts/AuthContext'
import { ConsentProvider } from './contexts/CookieConsentContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { Route, Routes } from 'react-router-dom'
import { MustBeGuestGuard } from './guards/MustBeGuestGuard'

function App() {

  return (
    <>
      <ConsentProvider>
        <ThemeProvider>
          <AuthProvider>
            <CookieConsentModal />
            <div className="page">
              <Header />
              <main>
                <Routes>
                  <Route path='/login' element={
                    <MustBeGuestGuard>
                      <Login />
                    </MustBeGuestGuard>} />
                  <Route path="/verification-code" element={
                    <MustBeGuestGuard>
                      <VerifyLoginCode />
                    </MustBeGuestGuard>} />
                </Routes>
              </main>
            </div>
          </AuthProvider>
        </ThemeProvider>
      </ConsentProvider>

    </>
  )
}

export default App
