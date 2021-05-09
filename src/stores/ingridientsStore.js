import { types, getRoot } from "mobx-state-tree";
import { IngridientStore } from "./ingridientStore";
import { createApiListing } from "./extensions/createApiListing";

export const IngridientsStore = types.compose(
  types
    .model("IngridientsStore", {})
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
  createApiListing(IngridientStore)
);
