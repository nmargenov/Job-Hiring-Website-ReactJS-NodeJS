import './App.css'
import { Login } from './components/Auth/Login/Login'
import { VerifyLoginCode } from './components/Auth/VerifyLoginCode/VerifyLoginCode'
import { CookieConsentModal } from './components/CookieConsentModal.jsx/CookieConsentModal'
import { Header } from './components/Header/Header'
import { ConsentProvider } from './contexts/CookieConsentContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <ConsentProvider>
        <ThemeProvider>
          <CookieConsentModal />
          <div className="page">
            <Header />
            <main>
              <Routes>
                <Route path='/login' element={<Login />} />
                <Route path="/verification-code" element={<VerifyLoginCode />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ConsentProvider>

    </>
  )
}

export default App
