import { types, getRoot } from "mobx-state-tree";
import { IngridientCategoryStore } from "./ingridient_categoryStore";

export const IngridientStore = types
  .model("Ingridient", {
    _id: types.identifier,
    title: types.optional(types.string, ""),
    is_active: false,
    is_available_on_mobile: false,
    category: types.maybeNull(IngridientCategoryStore),
    created_at: types.optional(types.string, "")
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
