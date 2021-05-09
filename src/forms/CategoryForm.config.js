export const CategoryFormConfig = (self, initials = {}) => ({
  id: "categoryForm",
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
    },
    {
      name: "is_available_on_mobile",
      type: "checkbox",
      label: "AVAILABLE_ON_APP",
      component: "checkbox"
    }
  ],
  blueprint: [
    "_id",
    [{ 8: ["title", "is_active", "is_available_on_mobile"] }, { 4: ["image"] }],
    "submit"
  ],
  initials,
  options: { validateOnChange: true },
  hooks: {
    onSuccess(form) {
      self.root.categories.save(form);
    },
    onError(form) {
      console.log("All form errors", form.errors());
    }
  }
});
