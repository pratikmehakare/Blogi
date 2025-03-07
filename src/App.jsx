import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { logout } from "./services/oprations/authService";
import { useDispatch } from "react-redux";

const App = () => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(JSON.parse(localStorage.getItem("token")));
    }
  }, [location]);

  const handleLogout = () => {
    dispatch(logout(navigate));
    setToken(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow py-4">
        <div className="container mx-auto px-4 flex justify-between">
          <Link to="/" className="text-xl font-bold flex items-center gap-2">
            <img src="/logo.png" alt="Logo" className="h-10 w-10" />
            Blogi
          </Link>

          <div>
            {token ? (
              <>
                {location.pathname === "/create" ? (
                  <Link to="/" className="mr-4 text-blue-500 hover:underline">
                    Blogs
                  </Link>
                ) : (
                  <Link
                    to="/create"
                    className="mr-4 text-blue-500 hover:underline"
                  >
                    Create Post
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="text-red-500 hover:underline"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="mr-4 text-blue-500 hover:underline"
                >
                  Login
                </Link>
                <Link to="/signup" className="text-green-500 hover:underline">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/edit/:id" element={<EditPost />} />
          {/* Pass setToken as a prop */}
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/signup" element={<Signup setToken={setToken} />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
