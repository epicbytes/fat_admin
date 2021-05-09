import { types, getRoot } from "mobx-state-tree";

const Geo = types.model("GEO", {
  type: types.optional(types.string, "Polygon"),
  coordinates: types.array(types.array(types.array(types.number)))
});

export const RestaurantStore = types
  .model("Restaurant", {
    _id: types.optional(types.string, ""),
    title: types.optional(types.string, ""),
    phone: types.optional(types.string, ""),
    email: types.optional(types.string, ""),
    index: types.optional(types.string, ""),
    city: types.optional(types.string, ""),
    address: types.optional(types.string, ""),
    geometry: types.optional(Geo, {}),
    radius: types.optional(types.number, 0),
    image: types.optional(types.string, "")
  })
  .views(self => ({
    get root() {
      return getRoot(self);
    },
    get imgUrl() {
      if (!self.image) return null;
      return `${self.root.app.baseUrl}/files/${self.image}`;
    }
  }))
  .actions(self => {
    const afterCreate = () => {};
    return {
      afterCreate
    };
  });
