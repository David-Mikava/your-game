import { useDispatch, useSelector } from 'react-redux';
import './Table.scss';
import { rootState } from '../../redux/store';
import { getTableAsync } from './tableSlice';
import { useEffect } from 'react';
import { Dispatch } from 'redux';

function Table() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch: Dispatch<any> = useDispatch();
  const { tables } = useSelector((store: rootState) => store.tables);

  useEffect(() => {
    dispatch(getTableAsync());
  }, []);

  return (
    <div className="table-container">
      <h1>Таблица Лидеров</h1>
      <table className="custom-table">
        <thead>
          <tr>
            <th className="name-column">Name</th>
            <th className="points-column">Points</th>
          </tr>
        </thead>
        <tbody>
          {tables.map((table) => (
            <tr>
              <td>{table.User.name}</td>
              <td>{table.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
