import React, { useState } from 'react';
import { signUpAsync } from './authSlice';
import { useAppDispatch } from '../../redux/store';

export type formDataTypes = {
  name: string;
  password: string;
};

function SignUp() {
  const [formData, setFormData] = useState<formDataTypes>({ name: '', password: '' });

  const dispatch = useAppDispatch();

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <main className="form-main">
      <h1>Регистрация</h1>

      <form
        className="form-login"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(signUpAsync(formData));
        }}
      >
        <input
          onChange={handleInputChange}
          className="login-input"
          type='text'
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
        <p>У вас есть аккаунт?</p>
        <a href="/login">Войти</a>
      </div>
    </main>
  );
}

export default SignUp;
