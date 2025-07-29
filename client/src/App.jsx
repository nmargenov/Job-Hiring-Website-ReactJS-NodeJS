import './App.css'
import { CookieConsentModal } from './components/CookieConsentModal.jsx/CookieConsentModal'
import { Header } from './components/Header/Header'
import { ConsentProvider } from './contexts/CookieConsentContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { Login } from './components/Login/Login.jsx';
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <ConsentProvider>
        <ThemeProvider>
          <CookieConsentModal />
          <Header />
          <Routes>
            <Route path='/login' element={<Login />} />
          </Routes>
        </ThemeProvider>
      </ConsentProvider>

    </>
  )
}

export default App
