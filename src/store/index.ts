import { createStore, useStore as vuexUseStore } from 'vuex';
import user, { IUserState, IUserStore } from './modules/user';
import menus, { ImenusItemState, IMenusStore } from './modules/menus';

export interface IRootState {
  user: IUserState;
  menus: ImenusItemState;
}

export type IRootStore = IUserStore<Pick<IRootState, 'user'>> & IMenusStore<Pick<IRootState, 'menus'>>;

export default () => {
  return createStore<IRootState>({
    strict: true,
    modules: {
      user: user(),
      menus: menus()
    }
  });
};

export const useStore = () => {
  return vuexUseStore<IRootState>();
};

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: IRootStore;
  }
}
