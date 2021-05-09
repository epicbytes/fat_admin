import { types } from "mobx-state-tree";

export function createDrawer() {
  return types
    .model({
      drawer_open: types.optional(types.boolean, false),
      drawer_data: types.map(types.frozen())
    })
    .volatile(self => ({
      drawer_body: types.function
    }))
    .actions(self => ({
      openCustomDrawer({ data, body }) {
        self.drawer_open = true;
        self.drawer_data = data;
        self.drawer_body = body;
      },
      updateDrawer(body) {
        self.drawer_body = body;
      },
      closeDrawer() {
        self.drawer_open = false;
        self.drawer_data = {};
        self.drawer_body = null;
      }
    }));
}
