import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './Layout.css';
import MotorcyclesList from '../pages/Dashboard/Dashboard';
import MotorcycleDetailsPage from '../pages/Motocycles/MotorcycleDetailsPage';
import LoginPage from '../pages/Login/Login';
import { Menubar } from 'primereact/menubar';
import { Button } from 'bootstrap';
import { useAuthContext } from '../contexts/auth.context';


const AdminLayout = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const { signOutFromAccount } = useAuthContext();
    const location = useLocation();
    const navigate = useNavigate();

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const handleLogOut = async () => {
        navigate('/login');
        await signOutFromAccount();
    };

    const searchInputStyles = {
        padding: '0.5rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
        width: '200px',
    };

    const renderHeader = () => {
        if (location.pathname === '/login') {
            return null;
        }

        return (
            <div className="layout-header">
                <div className="layout-header-content">
                    <h2 className="layout-header-title">Motosycle Shop</h2>
                    <Menubar model={menuItems} className="layout-menubar" />
                </div>

                <div className="layout-login-button">
                    <Button
                        icon="pi pi-user"
                        className="p-button-secondary"
                        onClick={handleLogOut}
                    >&nbsp;Log out</Button>
                </div>
            </div>
        );
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
            command: () => console.log('About clicked'),
        },
        {
            label: 'Support',
            icon: 'pi pi-fw pi-envelope',
            command: () => console.log('Contact clicked'),
        },
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
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/motorcycle/:motorcycleId" element={<MotorcycleDetailsPage />} />
                </Routes>
            </div>
        </div>
    )
};

export default AdminLayout;