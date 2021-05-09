export const ProductFormConfig = self => ({
  id: "productForm",
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
      name: "sku",
      label: "SKU",
      placeholder: "Insert Sku",
      rules: "required|string|between:3,25",
      component: "text",
      col_size: 4
    },
    {
      name: "price",
      label: "PRICE",
      rules: "required|numeric",
      component: "number",
      col_size: 4
    },
    {
      name: "net_weight",
      label: "NET_WEIGHT",
      rules: "numeric",
      component: "number"
    },
    {
      name: "gross_weight",
      label: "GROSS_WEIGHT",
      rules: "numeric",
      component: "number"
    },
    {
      name: "category",
      label: "CATEGORY",
      rules: "required",
      component: "dictionary_item",
      col_size: 4,
      fieldOptions: {
        modelName: "Category"
      }
    },
    {
      name: "description",
      label: "DESCRIPTION",
      rules: "string",
      component: "textarea",
      col_size: 12
    },
    {
      name: "ingridients",
      label: "INGRIDIENTS",
      rules: "array",
      default: [],
      initial: [],
      component: "dictionary_items",
      col_size: 12,
      fieldOptions: {
        modelName: "Ingridient"
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
      name: "is_active",
      type: "checkbox",
      label: "ACTIVE",
      component: "checkbox",
      col_size: 4
    },
    {
      name: "is_deleted",
      type: "checkbox",
      label: "DELETE",
      component: "checkbox",
      col_size: 4
    },
    {
      name: "is_available_on_mobile",
      type: "checkbox",
      label: "AVAILABLE_ON_APP",
      component: "checkbox",
      col_size: 4
    }
  ],
  initials: {
    ingridients: []
  },
  blueprint: [
    "_id",
    [
      {
        8: [
          "title",
          "sku",
          "category",
          "price",
          "net_weight",
          "gross_weight",
          "is_active",
          "is_available_on_mobile",
          "is_deleted",
          "description",
          "ingridients"
        ]
      },
      { 4: ["image"] }
    ],
    "submit"
  ],
  options: { validateOnChange: true },
  hooks: {
    onSuccess(form) {
      self.root.products.save(form);
    },
    onError(form) {
      console.log("All form errors", form.errors());
    }
  }
});
