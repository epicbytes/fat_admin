import { types, getRoot } from "mobx-state-tree";

export const GroupStore = types
  .model("Group", {
    _id: types.identifier,
    title: types.optional(types.string, ""),
    image: types.maybeNull(types.string),
    is_active: false,
    users_count: types.optional(types.number, 0)
  })
  .views(self => ({
    get root() {
      return getRoot(self);
    },
    get imgUrl() {
      if (!self.image) return null;
      return `${self.root.app.baseUrl}/files/${self.image}`;
    }
  }));
