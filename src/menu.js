import { library } from "@fortawesome/fontawesome-svg-core";

import {
  faChartPie,
  faUsers,
  faProjectDiagram,
  faUtensils,
  faUserLock,
  faLanguage,
  faExclamationTriangle,
  faUser,
  faComments,
  faComment,
  faAddressBook,
  faPlus,
  faUserPlus
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faUsers,
  faChartPie,
  faProjectDiagram,
  faUtensils,
  faUserLock,
  faLanguage,
  faExclamationTriangle,
  faUser,
  faComments,
  faComment,
  faAddressBook,
  faPlus,
  faUserPlus
);

export default [
  {
    title: "DASHBOARD",
    icon: "chart-pie",
    view: "dashboard",
    path: "/dashboard"
  },
  {
    title: "CLIENTS",
    icon: "users",
    view: "clients",
    path: "/clients",
    childs: [
      {
        title: "CLIENTS_LIST",
        icon: "user",
        path: "/clients",
        view: "clients"
      },
      {
        title: "ADD_CLIENT",
        icon: "user-plus",
        path: "/clients/create",
        view: "client",
        params: { id: "create" }
      },
      {
        title: "OPINIONS_LIST",
        icon: "comments",
        path: "/clients/opinions",
        view: "opinions"
      },
      {
        title: "ADD_OPINION",
        icon: "comment",
        path: "/clients/opinions/create",
        view: "opinion",
        params: { id: "create" }
      },
      {
        title: "CLIENT_GROUPS_LIST",
        icon: "address-book",
        path: "/clients/client_groups",
        view: "client_groups"
      },
      {
        title: "ADD_CLIENT_GROUP",
        icon: "plus",
        path: "/clients/client_groups/create",
        view: "client_group",
        params: { id: "create" }
      }
    ]
  },
  {
    title: "CATALOG",
    icon: "project-diagram",
    view: "categories",
    path: "/categories",
    childs: [
      {
        title: "CATEGORIES_LIST",
        icon: "apartment",
        path: "/categories",
        view: "categories"
      },
      {
        title: "ADD_CATEGORY",
        icon: "plus-circle",
        path: "/categories/create",
        view: "category",
        params: { id: "create" }
      },
      {
        title: "PRODUCTS_LIST",
        icon: "shop",
        path: "/categories/products",
        view: "products"
      },
      {
        title: "ADD_PRODUCT",
        icon: "plus-circle",
        path: "/categories/products/create",
        view: "product",
        params: { id: "create" }
      },
      {
        title: "INGRIDIENT_CATEGORIES_LIST",
        icon: "container",
        path: "/categories/ingridient_categories",
        view: "ingridient_categories"
      },
      {
        title: "ADD_INGRIDIENT_CATEGORY",
        icon: "plus-circle",
        path: "/categories/ingridient_categories/create",
        view: "ingridient_category",
        params: { id: "create" }
      },
      {
        title: "INGRIDIENTS_LIST",
        icon: "shop",
        path: "/categories/ingridients",
        view: "ingridients"
      },
      {
        title: "ADD_INGRIDIENT",
        icon: "plus-circle",
        path: "/categories/ingridients/create",
        view: "ingridient",
        params: { id: "create" }
      },
      {
        title: "MODIFICATORS_LIST",
        icon: "shop",
        path: "/categories/modificators",
        view: "modificators"
      },
      {
        title: "ADD_MODIFICATOR",
        icon: "plus-circle",
        path: "/categories/modificators/create",
        view: "modificator",
        params: { id: "create" }
      }
    ]
  },
  {
    title: "RESTAURANTS",
    icon: "utensils",
    path: "/restaurants",
    view: "restaurants",
    childs: [
      {
        title: "RESTAURANTS_LIST",
        icon: "shop",
        path: "/restaurants",
        view: "restaurants"
      },
      {
        title: "ADD_RESTAURANT",
        icon: "plus-circle",
        path: "/restaurants/create",
        id: "restaurants-create",
        view: "restaurant",
        params: { id: "create" }
      },
      {
        title: "ORDERS_LIST",
        icon: "container",
        path: "/restaurants/orders",
        view: "orders"
      },
      {
        title: "ADD_ORDER",
        icon: "plus-circle",
        path: "/restaurants/orders/create",
        view: "order",
        params: { id: "create" }
      },
      {
        title: "ZONES_LIST",
        icon: "container",
        path: "/restaurants/zones",
        view: "zones"
      },
      {
        title: "ADD_ZONE",
        icon: "plus-circle",
        path: "/restaurants/zones/create",
        view: "zone",
        params: { id: "create" }
      }
    ]
  },
  /* PLOP_IMPORT_MENU */
  {
    title: "PERMISSIONS",
    path: "/permissions",
    icon: "user-lock",
    view: "permissions",
    childs: [
      {
        title: "GROUPS_LIST",
        icon: "usergroup-add",
        path: "/permissions/groups",
        view: "groups"
      },
      {
        title: "ADD_GROUP",
        icon: "plus-circle",
        path: "/permissions/groups/create",
        view: "group",
        params: { id: "create" }
      },
      {
        title: "USERS_LIST",
        icon: "user",
        path: "/permissions/users",
        view: "users"
      },
      {
        title: "ADD_USER",
        icon: "plus-circle",
        path: "/permissions/users/create",
        view: "user",
        params: { id: "create" }
      }
    ]
  }
];
