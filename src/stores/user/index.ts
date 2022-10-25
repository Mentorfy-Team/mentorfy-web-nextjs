import produce from 'immer';
import create from 'zustand';
import { persist } from 'zustand/middleware';

type UserStateType = {
  userLogin: (user: ExternalModules.Supabase.User) => void;
  userLogout: () => void;
  setLoading: (value) => void;
  user?: ExternalModules.Supabase.User | null;
} & typeof initialUserStore;

const initialUserStore = {
  isLoading: false,
};

const userStore = create(
  persist<UserStateType>(
    (set, get) => ({
      ...initialUserStore,
      userLogin: (user: ExternalModules.Supabase.User) => {
        set(
          produce((draft: UserStateType) => {
            draft.user = user;
          }),
        );
      },
      setLoading: (value) => {
        set(
          produce((draft: UserStateType) => {
            draft.isLoading = value;
          }),
        );
      },
      userLogout: () => {
        set(
          produce((draft: UserStateType) => {
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
