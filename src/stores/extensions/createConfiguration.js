import { types, getRoot, getParent, getType } from "mobx-state-tree";

const defaultMenu = [
  {
    view: "translations",
    title: "defaults:TRANSLATIONS",
    path: "/translations",
    icon: "language"
  }
];

export const Route = types.model("Route", {
  withoutLayout: false,
  errorLayout: false,
  withoutContentBox: false,
  title: types.optional(types.string, ""),
  path: types.optional(types.string, ""),
  auth: false,
  exact: false,
  component: types.frozen()
});

export const Menu = types
  .model("Menu", {
    id: types.optional(types.string, ""),
    title: types.optional(types.string, ""),
    params: types.frozen(),
    icon: types.optional(types.string, ""),
    path: types.optional(types.string, "/"),
    view: types.optional(types.string, ""),
    childs: types.array(types.late(() => Menu))
  })
  .views(self => ({
    get root() {
      return getRoot(self);
    },
    get isSubMenu() {
      return getType(getParent(getParent(self))).name === "Menu";
    },
    get isSelected() {
      if (self.isSubMenu) {
        return self.root.router?.currentView?.name === self.view;
      }
      return (
        self.root.router?.currentView?.name === self.view ||
        self.root.router?.currentView?.path.startsWith(self.path)
      );
    }
  }));

export function createConfiguration() {
  return types
    .model({
      routes: types.array(Route),
      menu: types.array(Menu)
    })
    .views(self => ({
      get root() {
        return getRoot(self);
      },
      get selectedMenu() {
        return self.menu.find(menu => !!menu.isSelected);
      }
    }))
    .actions(self => ({
      setModuleConfig({ menu = [], moduleName = null, forms = () => {} }) {
        self.forms = forms(self);
        self.menu = [...menu, ...defaultMenu];
        self.moduleName = moduleName;
        self.initI18next();
      }
    }));
}
