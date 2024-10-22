import React, { useState } from 'react';
import './auth.scss';
import { formDataTypes } from './SignUp';
import { signInAsync } from './authSlice';
import { useAppDispatch } from '../../redux/store';

function SignIn() {
  const [formData, setFormData] = useState<formDataTypes>({ name: '', password: '' });

  const dispatch = useAppDispatch();

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <main className="form-main">
      <h1>Вход</h1>

      <form
        className="form-login"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(signInAsync(formData));
        }}
      >
        <input
          onChange={handleInputChange}
          className="login-input"
          type="text"
          placeholder="name"
          name="name"
          required
        />
        <input
          onChange={handleInputChange}
          className="login-input"
          type="password"
          placeholder="password"
          name="password"
          required
        />
        <button className="login-button" type="submit">
          Войти
        </button>
      </form>
      <div className="auth-link">
        <p>У вас нет аккаунта?</p>
        <a href="/reg">Создать аккаунт</a>
      </div>
    </main>
  );
}

export default SignIn;
