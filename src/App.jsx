import { BrowserRouter as Router, Route, Routes  } from "react-router-dom"
import { ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Explore from "./pages/Explore"
import Offers from "./pages/Offers"
import SignIn from "./pages/SignIn"
import Profile from "./pages/Profile"
import SignUp from "./pages/SignUp"
import Category from "./pages/Category";
import ForgotPassword from "./pages/ForgotPassword"
import NavBar from "./components/NavBar"
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import Listing from "./pages/Listing";
import Contact from "./pages/Contact";
import EditListing from "./pages/EditListing";

function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/profile" element={<PrivateRoute />} >
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/createlisting" element={<CreateListing />} />
          <Route path="/editlisting/:listingId" element={<EditListing />} />
          <Route
            path='/category/:categoryName/:listingId'
            element={<Listing/>} />
            <Route path='/contact/:landlordId' element={<Contact/>}  />
        </Routes>
         {/* NavBar  */}
        <NavBar />
      </Router> 
      <ToastContainer />    

    </>
  )
}

export default App
