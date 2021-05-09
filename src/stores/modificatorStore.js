import { types, getRoot } from "mobx-state-tree";
import { ModificatorCategoryStore } from "./modificator_categoryStore";

export const ModificatorStore = types
  .model("Modificator", {
    _id: types.identifier,
    title: types.optional(types.string, ""),
    is_active: false,
    is_available_on_mobile: false,
    category: types.maybeNull(ModificatorCategoryStore)
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
