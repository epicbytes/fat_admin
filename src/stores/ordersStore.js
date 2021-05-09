import { types, getRoot } from "mobx-state-tree";
import { OrderStore } from "./orderStore";
import { createApiListing } from "./extensions/createApiListing";

export const OrdersStore = types.compose(
  types
    .model("OrdersStore", {})
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
  createApiListing(OrderStore)
);
