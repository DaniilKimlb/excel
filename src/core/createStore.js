export function createStore(rootReducer, initialState) {
  let state = rootReducer({ ...initialState }, { type: '_INIT_' });
  let listeners = [];
  return {
    dispatch(action) {
      state = rootReducer({ ...initialState }, action);
      listeners.forEach((listener) => listener(state));
    },
    subscribe(fc) {
      listeners.push(fc);
      return {
        unsubscribe: () => listeners.filter((lis) => lis !== fc),
      };
    },
    getState() {
      return state;
    },
  };
}
