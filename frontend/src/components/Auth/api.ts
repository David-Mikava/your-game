import { formDataTypes } from './SignUp';

export async function regSubmit(formData: formDataTypes) {
  try {
    const res = await fetch('http://localhost:6788/auth/reg', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(formData),
    });

    if (res.status === 200) {
      const data = await res.json();
      alert('Вы зарегистрированы');
      window.location.href = '/login';
      return data;
    } else {
      alert('Произошла ошибка');
      throw new Error('Registration failed');
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function loginSubmit(formData: formDataTypes) {
  try {
    const res = await fetch('http://localhost:6788/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(formData),
    });


    if (res.status === 200) {
      const data = await res.json();
      window.location.href = '/rooms';
      return data;
    } else if (res.status === 401) {
      alert('Ошибка входа: неверный email или пароль');
      throw new Error('Unauthorized');
      throw new Error('Unauthorized');
    } else {
      alert('Произошла ошибка. Пожалуйста, попробуйте еще раз.');
      throw new Error('Login failed');
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const logOut = async (): Promise<void> => {
  try {
    const response = await fetch('http://localhost:6788/auth/logout', {
      method: 'GET',
      credentials: 'include',
    });

    if (response.status === 200) {
      window.location.href = '/login';
    }
  } catch (error) {
    console.log(error);
  }
};

export const checkUser = async () => {
  try {
    const response = await fetch('http://localhost:6788/auth/status', {
      method: 'GET',
      credentials: 'include',
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
