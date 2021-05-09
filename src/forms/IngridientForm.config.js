export const IngridientFormConfig = self => ({
  id: "ingridientForm",
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
      component: "text"
    },
    {
      name: "category",
      label: "CATEGORY",
      rules: "required|string",
      fieldOptions: {
        modelName: "Ingridient_category"
      },
      component: "dictionary_item"
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
      name: "is_unplugable",
      type: "checkbox",
      label: "CAN_UNPLUG",
      component: "checkbox"
    }
  ],
  blueprint: [
    "_id",
    [
      { 8: ["title", "category", "is_active", "is_unplugable"] },
      { 4: ["image"] }
    ],
    "submit"
  ],
  options: { validateOnChange: true },
  hooks: {
    onSuccess(form) {
      self.root.ingridients.save(form);
    },
    onError(form) {
      console.log("All form errors", form.errors());
    }
  }
});
