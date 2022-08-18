import produce from 'immer';
import create from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
  name: string;
  email: string;
};

type UserStateType = {
  saveUser: (user: User) => void;
  removeUser: () => void;
} & typeof initialUserStore;

const initialUserStore = {
  isLoggedIn: false,
  user: null,
};

const userStore = create(
  persist<UserStateType>(
    (set, get) => ({
      ...initialUserStore,
      saveUser: (user: Partial<User>) => {
        set(
          produce((draft: UserStateType) => {
            draft.isLoggedIn = true;
            draft.user = user;
          }),
        );
      },
      removeUser: () => {
        set(
          produce((draft: UserStateType) => {
            draft.isLoggedIn = false;
            draft.user = null;
          }),
        );
      },
    }),
    {
      name: 'mentorfy-session', // unique name
      getStorage: () => sessionStorage, // (optional) by default, 'localStorage' is used
    },
  ),
);

export default userStore;
