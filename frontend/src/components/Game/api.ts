import { removeRoom } from '../Rooms/api';

export async function getAnswer(
  id: number,
  correctly: boolean,
  points: number,
  questionId: number,
) {
  try {
    const res = await fetch(`http://localhost:6788/rooms/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        questionId,
        correctly,
        points,
      }),
    });
    return res.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getGame(id: number) {
  try {
    const res = await fetch(`http://localhost:6788/rooms/${id}`, {
      method: 'GET',
      credentials: 'include',
    });
    return res.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function finish(id: number) {
  try {
    const res = await fetch(`http://localhost:6788/rooms/${id}/finish`, {
      method: 'POST',
      credentials: 'include',
    });
    console.log('=====', res);
    if (res.status === 200) {
      const data = await res.json();
      removeRoom(id);
      window.location.href = '/rooms';
      return data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
