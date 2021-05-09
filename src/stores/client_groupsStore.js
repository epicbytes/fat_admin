import { types, getRoot } from "mobx-state-tree";
import { ClientGroupStore } from "./client_groupStore";
import { createApiListing } from "./extensions/createApiListing";

export const ClientGroupsStore = types.compose(
  types
    .model("ClientGroupsStore", {})
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
  createApiListing(ClientGroupStore)
);
