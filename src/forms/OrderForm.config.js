export const OrderFormConfig = self => ({
  id: "orderForm",
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
      rules: "required|string|between:3,25",
      component: "text",
      col_size: 12
    },
    {
      name: "image",
      type: "string",
      label: "IMAGE",
      component: "image",
      col_size: 12
    },
    {
      name: "is_active",
      type: "checkbox",
      label: "ACTIVE",
      component: "checkbox"
    }
  ],
  blueprint: [
    "_id",
    [{ 8: ["title", "is_active", "is_available_on_mobile"] }, { 4: ["image"] }],
    "submit"
  ],
  options: { validateOnChange: true },
  hooks: {
    onSuccess(form) {
      self.root.orders.save(form);
    },
    onError(form) {
      console.log("All form errors", form.errors());
    }
  }
});
