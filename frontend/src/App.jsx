import Navbar from "./components/Navbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx"
import ProfilePage from "./pages/ProfilePage.jsx"
import ContestPage from "./pages/ContestPage.jsx";
import {Routes , Route} from "react-router-dom"

const App = () => {
  return (
    <main className="bg-darker min-h-screen text-white">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/contest/:id" element={<ContestPage />} />
      </Routes>
    </main>
  );
}

export default App

