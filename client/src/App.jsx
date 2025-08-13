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
import { Files } from './components/Files/Files'
import { Apply } from './components/Business/Apply/Apply'
import { MessageProvider } from './contexts/MessageContext'
import { SocketProvider } from './contexts/SocketContext'
import { Admin } from './components/Admin/Admin'
import { BusinessApplicationsReview } from './components/Admin/BusinessApplicationsReview/BusinessApplicationsReview'
import { AdminProvider } from './contexts/AdminContext'
import { Business } from './components/Admin/Business/Business'
import { Page404 } from './components/Page404/Page404'

function App() {

  return (
    <>
      <AuthProvider>
        <MessageProvider>
          <AdminProvider>
            <SocketProvider>
              <ConsentProvider>
                <ThemeProvider>
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
                        <Route path="/business/apply" element={
                          <MustBeSetupAndLogged>
                            <Apply />
                          </MustBeSetupAndLogged>
                        } />
                        <Route path="/admin" element={
                          <MustBeSetupAndLogged>
                            <Admin />
                          </MustBeSetupAndLogged>
                        } />
                        <Route path="/admin/business-review" element={
                          <MustBeSetupAndLogged>
                            <BusinessApplicationsReview />
                          </MustBeSetupAndLogged>
                        } />
                        <Route path="/admin/business/:businessID" element={
                          <MustBeSetupAndLogged>
                            <Business />
                          </MustBeSetupAndLogged>
                        } />
                        <Route path="/files" element={
                          <MustBeSetupAndLogged>
                            <Files />
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

                        <Route path='*' element={
                          <MustBeSetupIfLogged>
                            <Page404 />
                          </MustBeSetupIfLogged>
                        } />
                      </Routes>
                    </main>
                  </div>
                </ThemeProvider>
              </ConsentProvider>
            </SocketProvider>
          </AdminProvider>
        </MessageProvider>
      </AuthProvider>

    </>
  )
}

export default App
