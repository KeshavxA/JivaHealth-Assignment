import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Users as UserManagementList } from './pages/UserManagement';
import { UserDetails as UserDetail } from './pages/UserManagement/UserDetail';
import { Dashboard } from './pages/Dashboard';
import { Appointments } from './pages/Appointments';
import { OrdersPayments } from './pages/OrdersPayments';
import { Settings } from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/user-management" replace />} />
          <Route path="user-management" element={<UserManagementList />} />
          <Route path="user-management/:id" element={<UserDetail />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="orders-payments" element={<OrdersPayments />} />
          <Route path="settings" element={<Settings />} />

          <Route path="users" element={<Navigate to="/user-management" replace />} />
          <Route path="users/:id" element={<Navigate to="/user-management" replace />} />
          <Route path="*" element={<Navigate to="/user-management" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
