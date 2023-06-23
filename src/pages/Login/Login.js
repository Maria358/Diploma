import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import './Login.css';
import { auth, db } from '../../index';
import {
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useRoleContext } from '../../contexts/role.context';


const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { updateRole } = useRoleContext();
  const navigate = useNavigate();
  let toast;

  const handleLogin = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, username, password);
      const userDocRef = doc(db, 'users', response.user.uid);
      const user = await getDoc(userDocRef);
      const data = user.data();
      updateRole(data.role);

      navigate("/");

    } catch (error) {
      console.error('Login failed:', error);

      toast.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Invalid username or password!',
        life: 3000,
      });
    }
  };

  return (
    <div className="login-page">
      <Card title="Login">
        <div className="p-fluid">
          <div className="p-field">
            <label htmlFor="username">Username</label>
            <InputText
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="p-field">
            <label htmlFor="password">Password</label>
            <InputText
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="p-field">
            <Button label="Login" onClick={handleLogin} />
          </div>
        </div>
      </Card>

      <Toast ref={(el) => (toast = el)} />
    </div>
  );
};

export default LoginPage;
