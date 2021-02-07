import { Module, Store } from 'vuex';
import { IRootState } from '..';
import axios from '../../axios/index';

interface ImenusItem {
  path?: string;
  name: string;
  redirect?: string;
  component: any;
  icon?: string;
  children?: [any];
}

export interface ImenusItemState {
  menusInfo: any;
}

export default () => {
  const menus: Module<ImenusItemState, IRootState> = {
    namespaced: true,
    state: {
      // menusInfo
      menusInfo: []
    },
    mutations: {
      getMenusData(state, list: ImenusItem[]) {
        state.menusInfo = list;
      }
    },
    actions: {
      async getMenusData({ commit }) {
        try {
          await axios.get('menus').then((res) => {
            commit('getMenusData', res);
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  return menus;
};

export type IMenusStore<S = ImenusItemState> = Store<S>;
