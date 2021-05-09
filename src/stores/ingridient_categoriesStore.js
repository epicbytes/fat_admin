import { types, getRoot } from "mobx-state-tree";
import { IngridientCategoryStore } from "./ingridient_categoryStore";
import { createApiListing } from "./extensions/createApiListing";

export const IngridientCategoriesStore = types.compose(
  types
    .model("IngridientCategoriesStore", {})
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
    }),
  createApiListing(IngridientCategoryStore)
);
