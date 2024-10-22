export async function getTable() {
  try {
    const res = await fetch('http://localhost:6788/table', {
      method: 'GET',
      credentials: 'include',
    });

    return res.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}
