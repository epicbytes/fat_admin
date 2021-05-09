import { types, getRoot } from "mobx-state-tree";

export const CategoryStore = types
  .model("Category", {
    _id: types.maybeNull(types.string),
    title: types.optional(types.string, ""),
    image: types.maybeNull(types.string),
    is_active: false,
    is_available_on_mobile: false,
    products_count: types.optional(types.number, 0)
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
  .actions(self => ({
    setIsActive(is_active) {
      self.is_active = is_active;
    },
    setIsAvailableOnMobile(is_available_on_mobile) {
      self.is_available_on_mobile = is_available_on_mobile;
    }
  }));
