export const RestaurantFormConfig = self => ({
  id: "restaurantForm",
  fields: [
    {
      name: "_id",
      type: "hidden",
      component: "hidden"
    },
    {
      name: "title",
      label: "TITLE",
      placeholder: "Insert Title",
      rules: "required|string|between:5,25",
      component: "text",
      col_size: 12
    },

    {
      name: "phone",
      label: "PHONE",
      rules: "string",
      component: "text",
      col_size: 3
    },
    {
      name: "email",
      label: "EMAIL",
      component: "text",
      rules: "email",
      col_size: 3
    },
    {
      name: "index",
      label: "INDEX",
      rules: "string",
      component: "text",
      col_size: 3
    },
    {
      name: "city",
      label: "CITY",
      rules: "string",
      component: "text",
      col_size: 3
    },
    {
      name: "address",
      label: "ADDRESS",
      rules: "string",
      component: "textarea",
      col_size: 12
    },

    {
      name: "description",
      label: "DESCRIPTION",
      rules: "string",
      component: "textarea",
      col_size: 12
    },
    {
      name: "zones",
      label: "DELIVERY_ZONES",
      rules: "array",
      default: [],
      initial: [],
      component: "dictionary_items",
      col_size: 12,
      fieldOptions: {
        modelName: "Zone"
      }
    },
    {
      name: "image",
      type: "string",
      label: "IMAGE",
      col_size: 12,
      component: "image"
    },
    {
      name: "order_types",
      label: "ORDER_TYPES",
      rules: "array",
      default: [],
      initial: [],
      component: "dictionary_items",
      col_size: 6,
      fieldOptions: {
        modelName: "List",
        submodelType: "order_types"
      }
    },
    {
      name: "payment_types",
      label: "PAYMEMT_TYPES",
      rules: "array",
      default: [],
      initial: [],
      component: "dictionary_items",
      col_size: 6,
      fieldOptions: {
        modelName: "List",
        submodelType: "payment_types"
      }
    },
    {
      name: "geo_data",
      label: "GEO_POSITION",
      col_size: 12,
      component: "maps"
    },
    {
      name: "is_active",
      type: "checkbox",
      label: "ACTIVE",
      col_size: 4,
      component: "checkbox"
    }
  ],
  initials: {
    zones: [],
    order_types: [],
    payment_types: []
  },
  blueprint: [
    "_id",
    [
      {
        8: ["title", "is_active", "description", "zones"]
      },
      { 4: ["image"] },
      { 12: ["phone", "email", "index", "city", "address", "geo_data"] },
      { 12: ["order_types", "payment_types"] }
    ],
    "submit"
  ],
  options: { validateOnChange: true },
  hooks: {
    onSuccess(form) {
      self.root.restaurants.save(form);
    },
    onError(form) {
      console.log("All form errors", form.errors());
    }
  }
});
