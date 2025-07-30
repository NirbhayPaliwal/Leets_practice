import Navbar from "./components/Navbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx"
import ProfilePage from "./pages/ProfilePage.jsx"
import ContestPage from "./pages/ContestPage.jsx";
import {Routes , Route} from "react-router-dom"
import ManageFriendsPage from "./pages/ManageFriendsPage.jsx";
import EditPage from "./pages/EditPage.jsx";
import Participate from './pages/Participate';
import ThankYouPage from "./pages/ThankYouPage.jsx";
import ParticipatePage from "./pages/ParticipatePage.jsx";
// Add inside your router



const App = () => {
  return (
    <main className="bg-darker min-h-screen text-white">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/contest/:id" element={<ContestPage />} />
        <Route path="/managefriends" element={<ManageFriendsPage />} />
       
        <Route path="/thankyou"element={<ThankYouPage />} />
       
        <Route path="/participate/:id" element={<ParticipatePage />} />
        {/* <Route path="/participate/:id" element={<Participate />} /> */}

        {/* <Route path="/edit" element={<EditPage />} /> */}
      </Routes>
    </main>
  );
}

export default App

