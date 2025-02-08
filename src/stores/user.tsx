import { UserDto } from "@/actions/entities/User/createUser";
import { create } from "zustand";

type UserStore = {
  user: UserDto;
  setUser: (user: UserDto) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: {} as UserDto,
  setUser: (user) => set({ user }),
}));
