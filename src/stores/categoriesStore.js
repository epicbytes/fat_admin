import { types, getRoot } from "mobx-state-tree";
import { CategoryStore } from "./categoryStore";
import { createApiListing } from "./extensions/createApiListing";

export const CategoriesStore = types.compose(
  types
    .model("CategoriesStore", {})
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
  createApiListing(CategoryStore)
);
