import { Room } from './Rooms';

export type State = {
  rooms: Room[];
  error: undefined | string;
};
