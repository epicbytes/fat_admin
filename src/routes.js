import React from "react";
import Screens from "screens";
import { View } from "stores/viewStore";
import { FormBuilder } from "components/FormBuilder";
import { ListBuilder } from "components/ListBuilder";
import { Dashboard } from "screens/Dashboard";

/**
 *
 *
 * ВНИМАНИЕ! роуты следует размещать в порядке
 * /categories/products/:id
 * /categories/products
 * /categories/:id
 * /categories
 * Для того, чтобы не возникала путаница в процессе опроса роутов
 *
 */
export const routes = {
  dashboard: View.create({
    name: "dashboard",
    path: "/",
    title: "DASHBOARD",
    component: <Dashboard />
  }),
  /**
   * Роуты для клиентов
   */
  opinions: View.create({
    name: "opinions",
    path: "/clients/opinions",
    title: "OPINIONS",
    component: <ListBuilder />,
    hooks: {
      async beforeEnter(self) {
        self.router.setProps({
          modelName: "opinions",
          filter: [[{ title: "text" }]],
          columns: [
            {
              title: "TITLE",
              name: "title",
              type: "text"
            },
            {
              title: "ACTIONS",
              name: "actions",
              type: "actions",
              options: {
                view: "opinion"
              }
            }
          ]
        });
        await self.root.opinions.pullRows();
      }
    }
  }),
  opinion: View.create({
    name: "opinion",
    path: "/clients/opinions/:id",
    title: "OPINION_EDITOR",
    component: <FormBuilder />,
    hooks: {
      async beforeEnter(self) {
        self.router.setProps({ form: "opinionForm" });
        await self.root.opinions.getById(self.router.params.id, true);
      }
    }
  }),
  client_groups: View.create({
    name: "client_groups",
    path: "/clients/client_groups",
    title: "GROUPS",
    component: <ListBuilder />,
    hooks: {
      async beforeEnter(self) {
        self.router.setProps({
          modelName: "client_groups",
          filter: [[{ title: "text" }]],
          columns: [
            {
              title: "IMAGE",
              name: "image",
              type: "image"
            },
            {
              title: "TITLE",
              name: "title",
              type: "text"
            },
            {
              title: "CLIENTS_COUNT",
              name: "clients_count",
              type: "crosslink",
              options: {
                view: "clients",
                paramName: "group",
                title: "CLIENT"
              }
            },
            {
              title: "ACTIONS",
              name: "actions",
              type: "actions",
              options: {
                view: "client_group"
              }
            }
          ]
        });
        await self.root.client_groups.pullRows();
      }
    }
  }),
  client_group: View.create({
    name: "client_group",
    path: "/clients/client_groups/:id",
    title: "GROUP_EDITOR",
    component: <FormBuilder />,
    hooks: {
      async beforeEnter(self) {
        self.router.setProps({ form: "client_groupForm" });
        await self.root.client_groups.getById(self.router.params.id, true);
      }
    }
  }),
  clients: View.create({
    name: "clients",
    path: "/clients",
    title: "CLIENTS",
    component: <ListBuilder />,
    hooks: {
      async beforeEnter(self) {
        self.router.setProps({
          modelName: "clients",
          filter: [
            [
              {
                title: "LAST_NAME",
                name: "last_name",
                type: "text",
                field: { placeholder: "SEARCH_BY_LAST_NAME" },
                col_size: 3
              },
              {
                title: "FIRST_NAME",
                name: "first_name",
                type: "text",
                field: { placeholder: "SEARCH_BY_FIRST_NAME" },
                col_size: 3
              },
              {
                title: "EMAIL",
                name: "email",
                type: "text",
                field: { placeholder: "SEARCH_BY_EMAIL" },
                col_size: 3
              },
              {
                title: "PHONE",
                name: "phone",
                type: "text",
                field: { placeholder: "PHONE" },
                col_size: 3
              }
            ]
          ],
          columns: [
            {
              title: "IMAGE",
              name: "image",
              type: "image"
            },
            {
              title: "FULLNAME",
              name: "full_name",
              type: "text"
            },
            {
              title: "PHONE",
              name: "phone",
              type: "text"
            },
            {
              title: "EMAIL",
              name: "email",
              type: "text"
            },
            {
              title: "ACTIONS",
              name: "actions",
              type: "actions",
              options: {
                view: "client"
              }
            }
          ]
        });
        await self.root.clients.pullRows();
      }
    }
  }),
  client: View.create({
    name: "client",
    path: "/clients/:id",
    title: "CLIENT_EDITOR",
    component: <FormBuilder />,
    hooks: {
      async beforeEnter(self) {
        self.router.setProps({ form: "clientForm" });
        await self.root.clients.getById(self.router.params.id, true);
      }
    }
  }),
  /**
   * Роуты для каталога
   */
  products: View.create({
    name: "products",
    path: "/categories/products",
    title: "PRODUCTS_LIST",
    component: <ListBuilder />,
    hooks: {
      async beforeEnter(self, params) {
        self.router.setProps({
          modelName: "products",
          filter: [
            [
              {
                title: "TITLE",
                name: "title",
                type: "text",
                field: { placeholder: "SEARCH_BY_TITLE" }
              },
              {
                title: "CATEGORY",
                name: "category",
                type: "dictionary_item",
                fieldOptions: {
                  modelName: "Category"
                }
              }
            ]
          ],
          columns: [
            {
              title: "IMAGE",
              name: "image",
              type: "image"
            },
            {
              title: "TITLE",
              name: "title",
              type: "text"
            },
            {
              title: "PRICE",
              name: "price",
              type: "price"
            },
            {
              title: "CATEGORY",
              name: "category",
              type: "subitem_title"
            },
            {
              title: "ACTIONS",
              name: "actions",
              type: "actions",
              options: {
                view: "product"
              }
            }
          ]
        });
        await self.root.products.pullRows();
      }
    }
  }),
  product: View.create({
    name: "product",
    path: "/categories/products/:id",
    title: "PRODUCT_EDITOR",
    component: <FormBuilder />,
    hooks: {
      async beforeEnter(self) {
        self.router.setProps({ form: "productForm" });
        await self.root.products.getById(self.router.params.id, true);
      }
    }
  }),
  ingridients: View.create({
    name: "ingridients",
    path: "/categories/ingridients",
    title: "INGRIDIENTS_LIST",
    component: <ListBuilder />,
    hooks: {
      async beforeEnter(self) {
        self.router.setProps({
          modelName: "ingridients",
          filter: [
            [
              {
                title: "TITLE",
                name: "title",
                type: "text",
                field: { placeholder: "SEARCH_BY_TITLE" }
              },
              {
                title: "CATEGORY",
                name: "category",
                type: "dictionary_item",
                fieldOptions: {
                  modelName: "Ingridient_category"
                }
              }
            ]
          ],
          columns: [
            {
              title: "IMAGE",
              name: "image",
              type: "image"
            },
            {
              title: "TITLE",
              name: "title",
              type: "text"
            },
            {
              title: "ACTIONS",
              name: "actions",
              type: "actions",
              options: {
                view: "ingridient"
              }
            }
          ]
        });
        await self.root.ingridients.pullRows();
      }
    }
  }),
  ingridient: View.create({
    name: "ingridient",
    path: "/categories/ingridients/:id",
    title: "INGRIDIENT_EDITOR",
    component: <FormBuilder />,
    hooks: {
      async beforeEnter(self) {
        self.router.setProps({ form: "ingridientForm" });
        await self.root.ingridients.getById(self.router.params.id, true);
      }
    }
  }),
  ingridient_categories: View.create({
    name: "ingridient_categories",
    path: "/categories/ingridient_categories",
    title: "CATEGORIES_LIST",
    component: <ListBuilder />,
    hooks: {
      async beforeEnter(self) {
        self.router.setProps({
          modelName: "ingridient_categories",
          filter: [
            [
              {
                title: "TITLE",
                name: "title",
                type: "text",
                field: { placeholder: "SEARCH_BY_TITLE" }
              }
            ]
          ],
          columns: [
            {
              title: "IMAGE",
              name: "image",
              type: "image"
            },
            {
              title: "TITLE",
              name: "title",
              type: "text"
            },
            {
              title: "INGRIDIENTS_COUNT",
              name: "ingridients_count",
              type: "crosslink",
              options: {
                view: "ingridients",
                paramName: "category",
                title: "INGRIDIENT"
              }
            },
            {
              title: "ACTIONS",
              name: "actions",
              type: "actions",
              options: {
                view: "ingridient_category"
              }
            }
          ]
        });
        await self.root.ingridient_categories.pullRows();
      }
    }
  }),
  ingridient_category: View.create({
    name: "ingridient_category",
    path: "/categories/ingridient_categories/:id",
    title: "CATEGORY_EDITOR",
    component: <FormBuilder />,
    hooks: {
      async beforeEnter(self) {
        self.router.setProps({ form: "ingridient_categoryForm" });
        await self.root.ingridient_categories.getById(
          self.router.params.id,
          true
        );
      }
    }
  }),
  modificators: View.create({
    name: "modificators",
    path: "/categories/modificators",
    title: "MODIFICATORS_LIST",
    component: <ListBuilder />,
    hooks: {
      async beforeEnter(self) {
        self.router.setProps({
          modelName: "modificators",
          filter: [
            [
              {
                title: "TITLE",
                name: "title",
                type: "text",
                field: { placeholder: "SEARCH_BY_TITLE" }
              },
              {
                title: "CATEGORY",
                name: "category",
                type: "dictionary_item",
                fieldOptions: {
                  modelName: "Modificator_category"
                }
              }
            ]
          ],
          columns: [
            {
              title: "IMAGE",
              name: "image",
              type: "image"
            },
            {
              title: "TITLE",
              name: "title",
              type: "text"
            },
            {
              title: "ACTIONS",
              name: "actions",
              type: "actions",
              options: {
                view: "modificator"
              }
            }
          ]
        });
        await self.root.modificators.pullRows();
      }
    }
  }),
  modificator: View.create({
    name: "modificator",
    path: "/categories/modificators/:id",
    title: "MODIFICATOR_EDITOR",
    component: <FormBuilder />,
    hooks: {
      async beforeEnter(self) {
        self.router.setProps({ form: "modificatorForm" });
        await self.root.modificators.getById(self.router.params.id, true);
      }
    }
  }),
  categories: View.create({
    name: "categories",
    path: "/categories",
    title: "CATEGORIES_LIST",
    component: <ListBuilder />,
    hooks: {
      async beforeEnter(self) {
        self.router.setProps({
          modelName: "categories",
          filter: [
            [
              {
                title: "TITLE",
                name: "title",
                type: "text",
                field: { placeholder: "SEARCH_BY_TITLE" },
                col_size: 12
              }
            ]
          ],
          columns: [
            {
              title: "IMAGE",
              name: "image",
              type: "image"
            },
            {
              title: "TITLE",
              name: "title",
              type: "text"
            },
            {
              title: "PRODUCTS_COUNT",
              name: "products_count",
              type: "crosslink",
              options: {
                view: "products",
                paramName: "category",
                title: "PRODUCT"
              }
            },
            {
              title: "ACTIONS",
              name: "actions",
              type: "actions",
              options: {
                view: "category"
              }
            }
          ]
        });
        await self.root.categories.pullRows();
      }
    }
  }),
  category: View.create({
    name: "category",
    path: "/categories/:id",
    title: "CATEGORY_EDITOR",
    component: <FormBuilder />,
    hooks: {
      async beforeEnter(self) {
        self.router.setProps({
          form: "categoryForm"
        });
        await self.root.categories.getById(self.router.params.id, true);
      }
    }
  }),
  /**
   * Роуты для ресторанов
   */
  orders: View.create({
    name: "orders",
    path: "/restaurants/orders",
    title: "ORDERS_LIST",
    component: <ListBuilder />,
    hooks: {
      async beforeEnter(self) {
        self.router.setProps({
          modelName: "orders",
          columns: [
            {
              title: "ACTIONS",
              name: "actions",
              type: "actions",
              options: {
                view: "order"
              }
            }
          ],
          filter: [[{ title: "text" }]]
        });
        await self.root.orders.pullRows();
      }
    }
  }),
  order: View.create({
    name: "order",
    path: "/restaurants/orders/:id",
    title: "ORDER_EDITOR",
    component: <FormBuilder />,
    hooks: {
      async beforeEnter(self) {
        self.router.setProps({ form: "orderForm" });
        await self.root.orders.getById(self.router.params.id, true);
      }
    }
  }),
  zones: View.create({
    name: "zones",
    path: "/restaurants/zones",
    title: "ZONES_LIST",
    component: <ListBuilder />,
    hooks: {
      async beforeEnter(self) {
        self.router.setProps({
          modelName: "zones",
          columns: [
            {
              title: "IMAGE",
              name: "image",
              type: "image"
            },
            {
              title: "TITLE",
              name: "title",
              type: "text"
            },
            {
              title: "ACTIONS",
              name: "actions",
              type: "actions",
              options: {
                view: "zone"
              }
            }
          ],
          filter: [[{ title: "text" }]]
        });
        await self.root.zones.pullRows();
      }
    }
  }),
  zone: View.create({
    name: "zone",
    path: "/restaurants/:id",
    title: "ZONE_EDITOR",
    component: <FormBuilder />,
    hooks: {
      async beforeEnter(self) {
        self.router.setProps({ form: "zoneForm" });
        await self.root.zones.getById(self.router.params.id, true);
      }
    }
  }),
  restaurants: View.create({
    name: "restaurants",
    path: "/restaurants",
    title: "RESTAURANTS_LIST",
    component: <ListBuilder />,
    hooks: {
      async beforeEnter(self) {
        self.router.setProps({
          modelName: "restaurants",
          columns: [
            {
              title: "IMAGE",
              name: "image",
              type: "image"
            },
            {
              title: "TITLE",
              name: "titlt",
              type: "text"
            },
            {
              title: "ACTIONS",
              name: "actions",
              type: "actions",
              options: {
                view: "restaurant"
              }
            }
          ],
          filter: [[{ title: "text" }]]
        });
        await self.root.restaurants.pullRows();
      }
    }
  }),
  restaurant: View.create({
    name: "restaurant",
    path: "/restaurants/:id",
    title: "RESTAURANT_EDITOR",
    component: <FormBuilder />,
    hooks: {
      async beforeEnter(self) {
        self.router.setProps({ form: "restaurantForm" });
        await self.root.restaurants.getById(self.router.params.id, true);
      }
    }
  }),
  /**
   * Роуты для управления правами
   */
  groups: View.create({
    name: "groups",
    path: "/permissions/groups",
    title: "GROUPS_LIST",
    component: <ListBuilder />,
    hooks: {
      async beforeEnter(self) {
        self.router.setProps({
          modelName: "groups",
          columns: [
            {
              title: "IMAGE",
              name: "image",
              type: "image"
            },
            {
              title: "TITLE",
              name: "titlt",
              type: "text"
            },
            {
              title: "ACTIONS",
              name: "actions",
              type: "actions",
              options: {
                view: "group"
              }
            }
          ],
          filter: [[{ title: "text" }]]
        });
        await self.root.groups.pullRows();
      }
    }
  }),
  group: View.create({
    name: "group",
    path: "/permissions/groups/:id",
    title: "GROUP_EDITOR",
    component: <FormBuilder />,
    hooks: {
      async beforeEnter(self) {
        self.router.setProps({ form: "groupForm" });
        await self.root.groups.getById(self.router.params.id, true);
      }
    }
  }),
  users: View.create({
    name: "users",
    path: "/permissions/users",
    title: "USERS_LIST",
    component: <ListBuilder />,
    hooks: {
      async beforeEnter(self) {
        self.router.setProps({
          modelName: "users",
          columns: [
            {
              title: "IMAGE",
              name: "image",
              type: "image"
            },
            {
              title: "ACTIONS",
              name: "actions",
              type: "actions",
              options: {
                view: "user"
              }
            }
          ],
          filter: [[{ title: "text" }]]
        });
        await self.root.users.pullRows();
      }
    }
  }),
  user: View.create({
    name: "user",
    path: "/permissions/users/:id",
    title: "USER_EDITOR",
    component: <FormBuilder />,
    hooks: {
      async beforeEnter(self) {
        self.router.setProps({ form: "userForm" });
        await self.root.users.getById(self.router.params.id, true);
      }
    }
  }),
  permissions: View.create({
    name: "permissions",
    path: "/permissions",
    title: "PERMISSIONS_LIST",
    component: <Screens.Permissions />,
    hooks: {
      async beforeEnter(self) {
        //await self.root.permissions.pullRows();
      }
    }
  }),
  translations: View.create({
    name: "translations",
    path: "/translations",
    title: "TRANSLATIONS_LIST",
    component: <Screens.Translations />,
    hooks: {
      async beforeEnter(self) {
        //await self.root.permissions.pullRows();
      }
    }
  }),
  login: View.create({
    name: "login",
    path: "/login",
    title: "LOGIN",
    auth: false,
    component: <Screens.Login />,
    layout: "auth"
  }),
  restore: View.create({
    name: "restore",
    path: "/restore",
    auth: false,
    component: <Screens.Restore />,
    layout: "auth"
  }),
  /* PLOP_IMPORT_ROUTES */
  error_404: View.create({
    name: "error_404",
    path: "/not_found",
    auth: false,
    component: <Screens.Error404 />,
    layout: "error"
  })
};
