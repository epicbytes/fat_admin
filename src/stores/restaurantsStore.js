import { types, getRoot } from "mobx-state-tree";
import { RestaurantStore } from "./restaurantStore";
import { createApiListing } from "./extensions/createApiListing";

export const RestaurantsStore = types.compose(
  types
    .model("RestaurantsStore", {})
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
  createApiListing(RestaurantStore)
);
