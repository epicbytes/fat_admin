export const ModificatorFormConfig = self => ({
  id: "modificatorForm",
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
      name: "category",
      label: "CATEGORY",
      rules: "required|string",
      fieldOptions: {
        modelName: "Modificator_category"
      },
      component: "dictionary_item"
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
    [
      {
        8: ["title", "sku", "category", "is_active"]
      },
      { 4: ["image"] }
    ],
    "submit"
  ],
  options: { validateOnChange: true },
  hooks: {
    onSuccess(form) {
      self.root.modificcators.save(form);
    },
    onError(form) {
      console.log("All form errors", form.errors());
    }
  }
});
