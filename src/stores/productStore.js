import { types, getRoot } from "mobx-state-tree";
import { CategoryStore } from "./categoryStore";

export const ProductStore = types
  .model("Product", {
    _id: types.identifier,
    title: types.optional(types.string, ""),
    description: types.optional(types.string, ""),
    price: types.optional(types.number, 0),
    is_active: false,
    is_available_on_mobile: false,
    category: types.maybeNull(CategoryStore)
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
