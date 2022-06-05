import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";

export interface State {
  isLogged: boolean;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    isLogged: false,
  },
  getters: {
    isLogged: (state): boolean => state.isLogged,
  },
  mutations: {
    setIsLogged: (state, payload: boolean): void => {
      state.isLogged = payload;
    },
  },
  actions: {},
});

export const useStore = () => {
  return baseUseStore(key);
};
