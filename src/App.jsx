import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import ForgotPassword from "./Login/ForgotPassword";
import ResetPassword from "./Login/ResetPassword";
import Services from "./Services/Services";
import AdminLayout from "./MainLayout";
import Dashboard from "./Dashboard/Dashboard";
import Vendor from "./Vendor/vendor"
import Clothesdata from "./clothes-data/clothes-data"
function App() {
  
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected + Sidebar Layout */}
          <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/clothes-data" element={<Clothesdata />} />
            <Route path="/Services" element={<Services />} />
            <Route path="/Vendor" element={<Vendor />} />

          </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;