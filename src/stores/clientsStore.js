import { types, getRoot } from "mobx-state-tree";
import { ClientStore } from "./clientStore";
import { createApiListing } from "./extensions/createApiListing";

export const ClientsStore = types.compose(
  types
    .model("ClientsStore", {})
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
  createApiListing(ClientStore)
);
