import { types, getRoot } from "mobx-state-tree";
import { GroupStore } from "./groupStore";

export const UserStore = types
  .model("User", {
    _id: types.identifier,
    first_name: types.maybeNull(types.string),
    last_name: types.maybeNull(types.string),
    full_name: types.maybeNull(types.string),
    phone: types.maybeNull(types.string),
    group: types.maybeNull(GroupStore),
    email: types.maybeNull(types.string),
    image: types.maybeNull(types.string)
  })
  .views(self => ({
    get root() {
      return getRoot(self);
    },
    get imgUrl() {
      if (!self.image) return null;
      return `${self.root.app.baseUrl}/files/${self.image}`;
    }
  }))
  .actions(self => {
    const afterCreate = () => {};
    return {
      afterCreate
    };
  });
