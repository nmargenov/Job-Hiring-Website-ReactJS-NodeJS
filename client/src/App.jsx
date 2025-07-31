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
import { SetupProfile } from './components/SetupProfile/SetupProfile'
import { MustBeLoggedAndNotSetup } from './guards/MustBeLoggedAndNotSetup'
import { MustBeSetupIfLogged } from './guards/MustBeSetupIflogged'
import { Home } from './components/Home/Home'
import { MustBeSetupAndLogged } from './guards/MustBeSetupAndLogged'
import { MyAccount } from './components/MyAccount/MyAccount'

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
                  <Route path="/" element={
                    <MustBeSetupIfLogged>
                      <Home />
                    </MustBeSetupIfLogged>
                  } />
                  <Route path="/profile" element={
                    <MustBeSetupAndLogged>
                      <MyAccount />
                    </MustBeSetupAndLogged>
                  } />
                  <Route path='/login' element={
                    <MustBeGuestGuard>
                      <Login />
                    </MustBeGuestGuard>} />
                  <Route path="/verification-code" element={
                    <MustBeGuestGuard>
                      <VerifyLoginCode />
                    </MustBeGuestGuard>} />
                  <Route path="/profile-setup" element={
                    <MustBeLoggedAndNotSetup>
                      <SetupProfile />
                    </MustBeLoggedAndNotSetup>
                  } />
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
