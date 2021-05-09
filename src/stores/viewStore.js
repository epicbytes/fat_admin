import { types, flow, getRoot } from "mobx-state-tree";
import qs from "qs";

export const View = types
  .model("View", {
    name: types.identifier,
    path: "",
    title: "",
    auth: true,
    component: types.union(types.string, types.frozen()),
    layout: types.optional(types.string, "main"),
    hooks: types.optional(types.frozen(), {})
  })
  .views(self => ({
    get root() {
      return getRoot(self);
    },
    get router() {
      return self.root.router;
    }
  }))
  .actions(self => ({
    formatUrl: (params, query) => {
      if (!params) return self.path;
      let url = self.path;

      for (let k in params) {
        if (url.includes(`:${k}`)) {
          url = url.replace(`:${k}`, params[k]);
        } else {
          query = { ...query, [k]: params[k] };
        }
      }

      return (
        url +
        qs.stringify(query, {
          addQueryPrefix: true
        })
      );
    },
    beforeEnter: flow(function*(params) {
      if (self.hooks.beforeEnter) {
        yield Promise.resolve(self.hooks.beforeEnter(self, params));
      }
    }),
    onEnter: flow(function*(params) {
      if (self.hooks.onEnter) {
        yield Promise.resolve(self.hooks.onEnter(self, params));
      }
    }),
    beforeExit: flow(function*(params) {
      if (self.hooks.beforeExit) {
        yield Promise.resolve(self.hooks.beforeExit(self, params));
      }
    }),
    onExit: flow(function*(params) {
      if (self.hooks.onExit) {
        yield Promise.resolve(self.hooks.onExit(self, params));
      }
    })
  }));
