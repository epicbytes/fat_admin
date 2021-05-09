import { createContext, useContext } from "react";
import makeInspectable from "mobx-devtools-mst";
import { types } from "mobx-state-tree";
import { APPStore } from "./appStore";
import { routes } from "routes";
import menu from "menu";
import forms from "forms";
import { RestaurantsStore } from "./restaurantsStore";
import { CategoriesStore } from "./categoriesStore";
import { ProductsStore } from "./productsStore";
import { ModificatorsStore } from "./modificatorsStore";
import { ClientsStore } from "./clientsStore";
import { UsersStore } from "./usersStore";
import { IngridientsStore } from "./ingridientsStore";
import { RouterStore, startRouter } from "./routerStore";
import { GroupsStore } from "./groupsStore";
/* PLOP_IMPORT_STORE */
import { OpinionsStore } from "./opinionsStore";
import { ClientGroupsStore } from "./client_groupsStore";
import { IngridientCategoriesStore } from "./ingridient_categoriesStore";
import { OrdersStore } from "./ordersStore";
import { ZonesStore } from "./zonesStore";
import { createLogger } from "./extensions/createLogger";

const model = {
  router: types.optional(RouterStore, {}),
  restaurants: types.optional(RestaurantsStore, {}),
  categories: types.optional(CategoriesStore, {}),
  products: types.optional(ProductsStore, {}),
  modificators: types.optional(ModificatorsStore, {}),
  clients: types.optional(ClientsStore, {}),
  users: types.optional(UsersStore, {}),
  zones: types.optional(ZonesStore, {}),
  ingridients: types.optional(IngridientsStore, {}),
  groups: types.optional(GroupsStore, {}),
  /* PLOP_INJECT_STORE */
  opinions: types.optional(OpinionsStore, {}),
  client_groups: types.optional(ClientGroupsStore, {}),
  ingridient_categories: types.optional(IngridientCategoriesStore, {}),
  orders: types.optional(OrdersStore, {}),
  app: types.optional(APPStore, {})
};

export const ApplicationStore = types
  .compose(
    types.model("Application", model).actions(self => {
      const afterCreate = () => {
        self.app.setModuleConfig({ menu, forms });
        startRouter(self.router);

        window.addEventListener("offline", function(e) {
          self.app.setOnline(false);
        });

        window.addEventListener("online", function(e) {
          self.app.setOnline(true);
        });
      };
      return {
        afterCreate
      };
    }),
    createLogger("Main: ")
  )
  .create({
    router: {
      views: routes
    }
  });

if (process.env.NODE_ENV !== "production") {
  makeInspectable(ApplicationStore);
}

const ApplicationStoreContext = createContext(null);

export const Provider = ApplicationStoreContext.Provider;

export function useStore() {
  const store = useContext(ApplicationStoreContext);
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store;
}

export default ApplicationStore;
