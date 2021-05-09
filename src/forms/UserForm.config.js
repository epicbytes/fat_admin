export const UserFormConfig = self => ({
  id: "userForm",
  fields: [
    {
      name: "_id",
      type: "hidden",
      component: "hidden"
    },
    {
      name: "image",
      label: "IMAGE",
      component: "image",
      col_size: 12
    },
    {
      name: "first_name",
      label: "FIRST_NAME",
      placeholder: "Insert FirstName",
      rules: "required|string|between:1,25",
      component: "text"
    },
    {
      name: "last_name",
      label: "LAST_NAME",
      placeholder: "Insert LastName",
      rules: "required|string|between:1,25",
      component: "text"
    },
    {
      name: "email",
      label: "Email",
      placeholder: "Insert Email",
      rules: "required|email|string|between:5,35",
      component: "text"
    },
    {
      name: "password",
      label: "PASSWORD_IF_MUST_BE_CHANGE",
      type: "text",
      rules: "string|between:5,35",
      component: "text"
    },
    {
      name: "group",
      label: "GROUP",
      rules: "required",
      fieldOptions: {
        modelName: "Group"
      },
      component: "dictionary_item"
    },
    {
      name: "is_active",
      type: "checkbox",
      label: "ACTIVE",
      component: "checkbox"
    },
    {
      name: "phone",
      label: "PHONE",
      placeholder: "Insert Phone",
      rules: "required|string",
      component: "text"
    }
  ],
  blueprint: [
    "_id",
    [
      {
        8: [
          "first_name",
          "last_name",
          "email",
          "phone",
          "password",
          "group",
          "is_active"
        ]
      },
      { 4: ["image"] }
    ],
    "submit"
  ],
  options: { validateOnChange: true },
  hooks: {
    onSuccess(form) {
      self.root.users.save(form);
    },
    onError(form) {
      console.log("All form errors", form.errors());
    }
  }
});
