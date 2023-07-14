import Dashboard from "./Pages/Dashboard";

import Header from "./Pages/Components/Header.jsx";
import { Routes, Route } from "react-router-dom";

import RegisterScreen from "./Pages/RegisterScreen";
import LoginScreen from "./Pages/LoginScreen";
import Authentication from "./Pages/Authentication";
import ProfileScreen from "./Pages/ProfileScreen";
import NewsContainer from "./Pages/Components/NewsContainer";
import NewsScreen from "./Pages/NewsScreen";

import { useSelector, useDispatch } from "react-redux";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

function App() {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div>
      <Header />
      <ToastContainer />
      <div className="app-container">
        <Routes>
          <Route
            path="/"
            element={userInfo ? <Dashboard /> : <Authentication />}
          ></Route>
        </Routes>

        <Routes>
          <Route
            path="/news"
            element={userInfo ? <NewsContainer /> : <Authentication />}
          ></Route>
        </Routes>
        <Routes>
          <Route path="/register" element={<RegisterScreen />}></Route>
        </Routes>
        <Routes>
          <Route path="/login" element={<LoginScreen />}></Route>
        </Routes>
        <Routes>
          <Route path="/auth" element={<Authentication />}></Route>
        </Routes>
        <Routes>
          <Route
            path="/profile"
            element={userInfo ? <ProfileScreen /> : <Authentication />}
          ></Route>
        </Routes>
        <Routes>
          <Route
            path="/news/:id/:ticker"
            element={userInfo ? <NewsScreen /> : <Authentication />}
          ></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
