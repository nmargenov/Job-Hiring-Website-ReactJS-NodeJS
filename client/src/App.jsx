import './App.css'
import { CookieConsentModal } from './components/CookieConsentModal.jsx/CookieConsentModal'
import { Header } from './components/Header/Header'
import { ConsentProvider } from './contexts/CookieConsentContext'
import { ThemeProvider } from './contexts/ThemeContext'

function App() {

  return (
    <>
      <ConsentProvider>
        <ThemeProvider>
          <CookieConsentModal />
          <Header />
        </ThemeProvider>
      </ConsentProvider>

    </>
  )
}

export default App
