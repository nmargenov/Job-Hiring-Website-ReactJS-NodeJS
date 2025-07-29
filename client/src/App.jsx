import './App.css'
import { CookieConsentModal } from './components/CookieConsentModal.jsx/CookieConsentModal'
import { Header } from './components/Header/Header'
import { ConsentProvider } from './contexts/CookieConsentContext'

function App() {

  return (
    <>
      <ConsentProvider>
        <CookieConsentModal />
        <Header />
      </ConsentProvider>

    </>
  )
}

export default App
