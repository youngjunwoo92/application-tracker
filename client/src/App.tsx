import { Route, Routes } from 'react-router-dom';
import Home from './pages/public/Home';
import DashboardHome from './pages/private/Dashboard';
import DashboardLayout from './layout/DashboardLayout';
import LoginPage from './pages/public/Login/LoginPage';
import ApplicationsPage from './pages/private/Dashboard/ApplicationsPage';
import RegisterPage from './pages/public/Register/RegisterPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Public Route */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Private Route */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="applications" element={<ApplicationsPage />} />
        </Route>
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
