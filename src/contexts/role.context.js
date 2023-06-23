import { createContext, useContext, useState } from 'react';
import { useAuth } from '../hooks/useAuth.hook';

const RoleContext = createContext({
    role: null,
    updateRole: (state) => { },
    getRole: () => { }
});

export const RoleContextProvider = ({ children }) => {
    const { user } = useAuth();
    const [role, setRole] = useState(null);

    const updateRole = (newRole) => {
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('userRole', newRole);
            setRole(newRole);
        }
    };

    const getRole = () => {
        if (typeof window !== 'undefined') {
            return sessionStorage.getItem('userRole');
        }
    };

    return (
        <RoleContext.Provider value={{ role, updateRole, getRole }}>
            {children}
        </RoleContext.Provider>
    );
};

export const useRoleContext = () => useContext(RoleContext);
