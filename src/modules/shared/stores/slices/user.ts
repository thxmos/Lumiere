import { StateCreator } from "zustand";
import { RootState, UserSlice } from "../types";
import { SessionUser } from "@/utils/lib/lucia";

export const DEFAULT_USER_STATE: SessionUser = {
  id: "",
  name: "",
  avatar: "",
  username: "",
  roles: "",
};

export const createUserSlice: StateCreator<RootState, [], [], UserSlice> = (
  set,
) => ({
  user: DEFAULT_USER_STATE,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: DEFAULT_USER_STATE }),
});
