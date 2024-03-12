import { User } from "./user.types";

export interface AuthContextType {
  user: User | null;
  logout: () => void;
}
