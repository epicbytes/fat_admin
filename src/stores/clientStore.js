import { types, getRoot } from "mobx-state-tree";

export const ClientStore = types
  .model("Client", {
    _id: types.identifier,
    first_name: types.maybeNull(types.string),
    last_name: types.maybeNull(types.string),
    full_name: types.maybeNull(types.string),
    phone: types.maybeNull(types.string),
    email: types.maybeNull(types.string),
    image: types.maybeNull(types.string)
  })
  .views(self => ({
    get root() {
      return getRoot(self);
    }
  }))
  .actions(self => {
    const afterCreate = () => {};
    return {
      afterCreate
    };
  });
