import { types, getRoot } from "mobx-state-tree";
import { OpinionStore } from "./opinionStore";
import { createApiListing } from "./extensions/createApiListing";

export const OpinionsStore = types.compose(
  types
    .model("OpinionsStore", {})
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
  createApiListing(OpinionStore)
);
