export async function getRooms() {
  try {
    const res = await fetch('http://localhost:6788/rooms', {
      credentials: 'include',
    });
    return res.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function addRoom() {
  try {
    const res = await fetch('http://localhost:6788/rooms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    return res.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function removeRoom(id: number) {
  try {
    const res = await fetch(`http://localhost:6788/rooms/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    return res.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}
