import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Layout from "./components/Layout";
import Reset from "./Pages/Reset";
import ResetPassword from "./Pages/ResetPassword";
import Admin from "./Pages/Admin";
import { Dashboard, BrandCategory, Users } from "./components/Admin";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Account  */}
          <Route path="/account">
            <Route element={<Layout page="Login" />}>
              <Route path="login" element={<Login />} />
            </Route>
            <Route element={<Layout page="Register" />}>
              <Route path="register" element={<Register />} />
            </Route>
            <Route element={<Layout page="Reset Password" />}>
              <Route path="reset" element={<Reset />} />
            </Route>
            <Route path="reset/:id" element={<ResetPassword />} />
            <Route element={<Layout page="Profile" />}>
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>
          {/* Admin */}
          <Route path="/admin">
            <Route element={<Admin />}>
              <Route path="" element={<Dashboard />} />
              <Route path="users" element={<Users />} />
              <Route path="categories">
                <Route path="brand" element={<BrandCategory />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
