import { types, getRoot } from "mobx-state-tree";
import { ProductStore } from "./productStore";
import { createApiListing } from "./extensions/createApiListing";

export const ProductsStore = types.compose(
  types
    .model("ProductsStore", {})
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
  createApiListing(ProductStore)
);
