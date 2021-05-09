import { types, getRoot } from "mobx-state-tree";

export function createSubscribtion() {
  return types
    .model({
      subscribtions: types.map(types.frozen())
    })
    .views(self => ({
      get root() {
        return getRoot(self);
      }
    }))
    .actions(self => {
      const subscribe = (moduleName, name) => {
        const fullName = `${moduleName}:${name}`;
        if (self.subscribtions.has(fullName)) {
          self.subscribtions.set(
            fullName,
            self.subscribtions.get(fullName) + 1
          );
        } else {
          self.root.navigator.socket.subscribe({ name: fullName });
          self.subscribtions.set(fullName, 1);
        }
      };
      const unsubscribe = (moduleName, name) => {
        const fullName = `${moduleName}:${name}`;
        if (
          self.subscribtions.has(fullName) &&
          self.subscribtions.has(fullName) > 1
        ) {
          self.subscribtions.set(
            fullName,
            self.subscribtions.get(fullName) - 1
          );
        } else {
          self.root.navigator.socket.unsubscribe({ name: fullName });
          self.subscribtions.delete(fullName);
        }
      };
      const unsubscribeAll = () => {
        for (let subscribe of self.subscribtions) {
          self.root.navigator.socket.unsubscribe({
            name: subscribe[0]
          });
          self.subscribtions.delete(subscribe[0]);
        }
      };
      const beforeDestroy = () => {
        self.unsubscribeAll();
        self.subscribtions.clear();
      };

      return {
        subscribe,
        unsubscribe,
        unsubscribeAll,
        beforeDestroy
      };
    });
}
