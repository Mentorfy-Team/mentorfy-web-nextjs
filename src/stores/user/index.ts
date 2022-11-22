import produce from 'immer';
import create from 'zustand';
import { persist } from 'zustand/middleware';

type Params = {
  signup: Partial<{
    product_id: string;
    image: string;
    refeerer: string;
    title: string;
  }>;
  mb: {
    product_id: string;
  };
  subpage: string;
};

type UserStateType = {
  userLogin: (user: ExternalModules.Supabase.User) => void;
  userLogout: () => void;
  setLoading: (value) => void;
  setAppParams: (appParams: Partial<Params>) => void;
  user?: ExternalModules.Supabase.User | null;
  appParams?: Partial<Params>;
  llc?: string;
} & typeof initialUserStore;

const initialUserStore = {
  isLoading: false,
  appParams: {},
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
            draft.llc = new Date().toString();
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
      setAppParams: (appParams) => {
        set(
          produce((draft: UserStateType) => {
            draft.appParams = { ...draft.appParams, ...appParams };
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
