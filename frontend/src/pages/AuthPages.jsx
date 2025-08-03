import React, { useState } from 'react';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';

const AuthPages = () => {
  const [login, setLogin] = useState(true); 

  return (
    <div>
      {login ? <LoginForm setLogin={setLogin} /> : <RegisterForm setLogin={setLogin} />}
    </div>
  );
};

export default AuthPages;
