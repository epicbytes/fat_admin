import { types, getRoot } from "mobx-state-tree";
import { ModificatorStore } from "./modificatorStore";
import { createApiListing } from "./extensions/createApiListing";

export const ModificatorsStore = types.compose(
  types
    .model("ModificatorsStore", {})
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
  createApiListing(ModificatorStore)
);
