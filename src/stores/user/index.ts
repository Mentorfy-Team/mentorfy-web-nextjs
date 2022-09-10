import produce from 'immer';
import create from 'zustand';
import { persist } from 'zustand/middleware';

type UserStateType = {
  userLogin: (user: ExternalModules.Supabase.User) => void;
  userLogout: () => void;
  user?: ExternalModules.Supabase.User | null;
} & typeof initialUserStore;

const initialUserStore = {
  isLoggedIn: false,
};

const userStore = create(
  persist<UserStateType>(
    (set, get) => ({
      ...initialUserStore,
      userLogin: (user: ExternalModules.Supabase.User) => {
        set(
          produce((draft: UserStateType) => {
            draft.isLoggedIn = true;
            draft.user = user;
          }),
        );
      },
      userLogout: () => {
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
