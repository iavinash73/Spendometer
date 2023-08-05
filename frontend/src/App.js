import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Savings from './pages/Savings';
import Bill from './pages/Bill';
import Sidebar from './components/common/Sidebar';
import BottomBar from './components/common/BottomBar';
import Colab from './pages/Colab';
function App() {
  return (
    <>
      <Router>
        <AppContent />
      </Router>
      <ToastContainer />
    </>
  );
}

function AppContent() {
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    // Code to run every time the path changes
    // console.log('Current URL path:', path);
  }, [path]);

  return (
    <div className="flex">
      {path === "/" || path === "/register" ? "" : <Sidebar />}
      {path === "/" || path === "/register" ? "" : <BottomBar />}
      {/* <BottomBar /> */}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/savings" element={<Savings />} />
          <Route path="/bills" element={<Bill />} />
          <Route path="/colabs" element={<Colab />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
