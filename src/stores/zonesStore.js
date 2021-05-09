import { types, getRoot } from "mobx-state-tree";
import { ZoneStore } from "./zoneStore";
import { createApiListing } from "./extensions/createApiListing";

export const ZonesStore = types.compose(
  types
    .model("ZonesStore", {})
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
  createApiListing(ZoneStore)
);
