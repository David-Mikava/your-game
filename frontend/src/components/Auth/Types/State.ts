import { User } from "./User";

export type State = {
  userName: string;
  auth: User | undefined
  error: undefined | string;
};
