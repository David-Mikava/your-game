import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.scss';
import SignIn from '../components/Auth/SignIn';
import SignUp from '../components/Auth/SignUp';
import NavBar from '../components/NavBar/NavBar';
import Table from '../components/Table/Table';
import Game from '../components/Game/Game';
import Rooms from '../components/Rooms/Rooms';
import { setNavigateFunction } from '../redux/hook';
import { useAppDispatch } from '../redux/store';
import { useEffect } from 'react';
import { checkUserAsync } from '../components/Auth/authSlice';

function App() {
  const navigate = useNavigate();
  setNavigateFunction(navigate);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkUserAsync());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/reg" element={<SignUp />} />
        <Route path="/" element={<NavBar />}>
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/table" element={<Table />} />
          <Route path="/game/:id" element={<Game />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
