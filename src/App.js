import React, { useEffect } from 'react';
import CustomerLayout from './layouts/CustomerLayout';
import MotorcyclesList from './pages/Dashboard/Dashboard';
import { useAuthContext } from './contexts/auth.context';
import { useNavigate } from 'react-router-dom';
import { useRoleContext } from './contexts/role.context';
import AdminLayout from './layouts/AdminLayout';

const App = () => {
  const { user } = useAuthContext();
  const { role } = useRoleContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  if (role === "customer") {
    return (
      <CustomerLayout>
        <div className="app">
          <MotorcyclesList selectedCategory={"All"} searchQuery={""} />
        </div>
      </CustomerLayout>
    );
  }

  return <AdminLayout>
    <div className="app">
      <MotorcyclesList selectedCategory={"All"} searchQuery={""} />
    </div>
  </AdminLayout>
};

export default App;

