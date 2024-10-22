import './NavBar.scss';
import { Menu } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { rootState } from '../../redux/store';
import { logOutAsync } from '../Auth/authSlice';
import { Dispatch } from '@reduxjs/toolkit';

function NavBar() {
  const userName = useSelector((state: rootState) => state.auth.userName);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch: Dispatch<any> = useDispatch();

  const onClickLogout = async () => {
    try {
      dispatch(logOutAsync());
    } catch (error) {
      console.error('Ошибка при выходе из системы:', error);
    }
  };
  const items = [
    {
      key: 'rooms',
      label: 'Комнаты',
      to: '/rooms',
    },
    {
      key: 'table',
      label: 'Таблица',
      to: '/table',
    },
    {
      key: 'logout',
      label: 'Выйти',
      onClick: onClickLogout,
    },
  ];

  const onClick = () => {};

  return (
    <div className="content">
      <div className="navbar">
        <Menu
          onClick={onClick}
          mode="inline"
          style={{ backgroundColor: '#f2f2f2', borderRadius: '5px', margin: '10px' }}
        >
          <Menu.Item key="user" className="menu-item non-clickable">
            {userName}
          </Menu.Item>
          {items.map((item) => (
            <Menu.Item key={item.key} className="menu-item">
              {/* {item.to && <Link to={item.to}>{item.label}</Link>} */}
              {item.onClick ? (
                // Если есть onClick, то создаем кнопку с обработчиком onClick
                <button className="out" onClick={item.onClick}>
                  {item.label}
                </button>
              ) : (
                // Иначе создаем ссылку на соответствующий маршрут
                <Link to={item.to}>{item.label}</Link>
              )}
            </Menu.Item>
          ))}
        </Menu>
      </div>
      <Outlet />
    </div>
  );
}

export default NavBar;
