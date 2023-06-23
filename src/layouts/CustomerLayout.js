import React, { useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import './Layout.css';
import MotorcyclesList from '../pages/Dashboard/Dashboard';
import MotorcycleDetailsPage from '../pages/Motocycles/MotorcycleDetailsPage';
import LoginPage from '../pages/Login/Login';
import { useAuthContext } from '../contexts/auth.context';
import AboutPage from '../pages/About/About';
import RegistrationForm from '../pages/Registration/RegistrationPage';


const CustomerLayout = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { signOutFromAccount } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    navigate('/login');
    await signOutFromAccount();
  };

  const renderHeader = () => {
    if (location.pathname === '/login' || location.pathname === '/registration') {
      return null;
    }

    return (
      <div className="layout-header">
        <div className="layout-header-content">
          <h2 className="layout-header-title">Motorcycle Shop</h2>
          <Menubar model={menuItems} className="layout-menubar" />
        </div>

        <div className="layout-login-button">
          <Button
            icon="pi pi-user"
            className="p-button-primary"
            onClick={handleLogOut}
          >&nbsp;Log out</Button>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className="layout-content mt-5">
        <h1>Welcome to the Dynamic Content!</h1>
      </div>
    );
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const searchInputStyles = {
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '200px',
  };

  const menuItems = [
    {
      label: 'Home',
      icon: 'pi pi-fw pi-home',
      command: () => navigate("/"),
    },
    {
      label: 'About',
      icon: 'pi pi-fw pi-info-circle',
      command: () => navigate("/about"),
    },
    // {
    //   label: 'Contact',
    //   icon: 'pi pi-fw pi-envelope',
    //   command: () => console.log('Contact clicked'),
    // },
    {
      label: 'Filter',
      icon: 'pi pi-fw pi-filter',
      items: [
        {
          label: 'All',
          command: () => handleCategoryChange('All'),
        },
        {
          label: 'Sport',
          command: () => handleCategoryChange('Sport'),
        },
        {
          label: 'Enduro',
          command: () => handleCategoryChange('Enduro'),
        },
        {
          label: 'Road',
          command: () => handleCategoryChange('Road'),
        },
        {
          label: 'Pocket Bike',
          command: () => handleCategoryChange('Pocket Bike'),
        },
      ],
    },
    {
      label: (
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value.toUpperCase())}
          placeholder="Search by Brand"
          className="form-control"
          style={searchInputStyles}
        />
      ),
    },
  ];

  return (
    <div className="layout">
      <div className="layout-main">
        {renderHeader()}

        <Routes>
          <Route path="/" element={<MotorcyclesList selectedCategory={selectedCategory} searchQuery={searchQuery} />} />
          <Route path="/bucket" element={renderContent} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/registration" element={<RegistrationForm />} />
          <Route path="/motorcycle/:motorcycleId" element={<MotorcycleDetailsPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default CustomerLayout;