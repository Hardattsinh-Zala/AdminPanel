import { BrowserRouter, Route, Routes } from "react-router";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Contact } from "./pages/Contact";
import { Services } from "./pages/Services";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Logout } from "./pages/logout";
import { Admin } from "./components/layouts/Admin";
import { AdminUsers } from "./components/layouts/AdminUsers";
import { AdminContacts } from "./components/layouts/AdminContacts";
import { EditUser } from "./components/layouts/EditUser";
import { EditContact } from "./components/layouts/EditContact";
import { ToastContainer } from "react-toastify";
import { ScrollToTop } from "./components/ScrollToTop";
import { Error } from "./pages/Error";
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
      <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/admin" element={<Admin/>} >
            <Route path="/admin/user" element={<AdminUsers/>} >
              <Route path="/admin/user/edit/:id" element={<EditUser/>} />
            </Route>
            <Route path="/admin/contact" element={<AdminContacts/>} >
              <Route path="/admin/contact/edit/:id" element={<EditContact/>} />
            </Route>
          </Route>
          <Route path="*" element={<Error/>} />
        </Routes>
        <Footer/>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </BrowserRouter>
    </>
  )
}

export default App
