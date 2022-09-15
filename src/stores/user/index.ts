import produce from 'immer';
import create from 'zustand';
import { persist } from 'zustand/middleware';

type UserStateType = {
  setProfile: (profile: UserClient.Profile) => void;
  profile?: UserClient.Profile;
} & typeof initialUserStore;

const initialUserStore = {};

const userStore = create(
  persist<UserStateType>(
    (set, get) => ({
      ...initialUserStore,
      setProfile: (profile) => {
        set(
          produce((draft: UserStateType) => {
            draft.profile = profile;
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
