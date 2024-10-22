import { rootState } from "../../redux/store";
import { Room } from "./Types/Rooms";

export const selectRoomById = (state: rootState, id: number): Room | undefined => {
  return state.rooms.rooms.find(room => room.id === id);
};