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
  menusInfo: ImenusItem[];
}

export default () => {
  const menus: Module<ImenusItemState, IRootState> = {
    namespaced: true,
    state: {
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
          let data: any = [];
          await axios.get('menus').then((res) => {
            data = res;
          });
          commit('getMenusData', data);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  return menus;
};

export type IMenusStore<S = ImenusItemState> = Store<S>;
