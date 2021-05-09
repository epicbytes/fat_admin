import { types, getRoot } from "mobx-state-tree";
import { UserStore } from "./userStore";
import { createApiListing } from "./extensions/createApiListing";

export const UsersStore = types.compose(
  types
    .model("UsersStore", {})
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
  createApiListing(UserStore)
);
