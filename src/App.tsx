import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { Dashboard } from './pages/Dashboard';
import { Users } from './pages/UserManagement';
import { UserDetails } from './pages/UserManagement/UserDetail';
import { Appointments } from './pages/Appointments';
import { OrdersPayments } from './pages/OrdersPayments';
import { Settings } from './pages/Settings';

function AppLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Header />
        <main id="main-content" className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<UserDetails />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/orders-payments" element={<OrdersPayments />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/users" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
