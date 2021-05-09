import { types, getRoot } from "mobx-state-tree";
import { GroupStore } from "./groupStore";
import { createApiListing } from "./extensions/createApiListing";

export const GroupsStore = types.compose(
  types
    .model("GroupsStore", {})
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
  createApiListing(GroupStore)
);
