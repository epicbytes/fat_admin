import { types, getRoot } from "mobx-state-tree";

export const ModificatorCategoryStore = types
  .model("Modificator_category", {
    _id: types.maybeNull(types.string),
    title: types.optional(types.string, ""),
    image: types.maybeNull(types.string),
    is_active: false
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
