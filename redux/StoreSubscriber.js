import { isEject } from '../src/core/utility';

export class StoreSubscriber {
  constructor(store) {
    this.store = store;
    this.sub = null;
    this.prevState = {};
  }
  subscriberComponent(components) {
    this.prevState = this.store.getState();
    this.sub = this.store.subscribe((state) => {
      Object.keys(state).forEach((key) => {
        if (!isEject(this.prevState[key], state[key])) {
          components.forEach((component) => {
            if (component.isWatching(key)) {
              const changed = { [key]: state[key] };
              component.storeChanged(changed);
            }
          });
        }
      });
      this.prevState = this.store.getState();
    });
  }
  unsubscribeFromStore() {
    this.sub.unsubscribe();
  }
}
