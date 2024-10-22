import { Card } from 'antd';
import './Rooms.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { rootState, useAppDispatch } from '../../redux/store';
import { addRoomsAsync, getRoomsAsync, removeRoomsAsync } from '../Rooms/roomsSlice';
import { useEffect } from 'react';

function Rooms() {
  const { rooms } = useSelector((state: rootState) => state.rooms);

  const dispatch = useAppDispatch();

  function addRoom() {
    dispatch(addRoomsAsync());
    // dispatch(incrementRoomCount());
  }

  function deleteRoom(id: number) {
    dispatch(removeRoomsAsync(id));
  }

  useEffect(() => {
    dispatch(getRoomsAsync());
  }, [dispatch]);

  return (
    <div className="rooms">
      {rooms.map((room) => (
        <div key={room.id} className="room-card">
          <Card className="card">
            <Link to={`/game/${room.id}`} className="room-link">
              <h2>Комната {room.id}</h2>
            </Link>
            <button onClick={() => deleteRoom(room.id)} type="button" className="delete-button">
              Удалить
            </button>
          </Card>
        </div>
      ))}
      <Card className="add-card">
        <button type="button" onClick={addRoom}>
          Добавить
        </button>
      </Card>
    </div>
  );
}

export default Rooms;
