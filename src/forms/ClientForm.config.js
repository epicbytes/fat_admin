export const ClientFormConfig = self => ({
  id: "clientForm",
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
      component: "text",
      hooks: {
        onChange(field) {
          const full_name = field.state.form.$("full_name");
          const last_name = field.state.form.$("last_name").$value;
          full_name.onChange([last_name, field.$value].join(" "));
        }
      }
    },
    {
      name: "last_name",
      label: "LAST_NAME",
      placeholder: "Insert LastName",
      rules: "required|string|between:1,25",
      component: "text",
      hooks: {
        onChange(field) {
          const full_name = field.state.form.$("full_name");
          const first_name = field.state.form.$("first_name").$value;
          full_name.onChange([field.$value, first_name].join(" "));
        }
      }
    },
    {
      name: "full_name",
      label: "FULL_NAME",
      rules: "required|string|between:1,25",
      component: "text",
      disabled: true,
      col_size: 12
    },
    {
      name: "email",
      label: "Email",
      placeholder: "Insert Email",
      rules: "required|email|string|between:5,35",
      component: "text"
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
    /* {
      name: "complex",
      label: "Complex input",
      component: "complex",
      col_size: 12,
      fieldOptions: {
        fields: [
          {
            name: "first_name",
            label: "FIRST_NAME",
            placeholder: "Insert FirstName",
            rules: "required|string|between:1,25",
            component: "text",
            hooks: {
              onChange(field) {
                const full_name = field.state.form.$("full_name");
                const last_name = field.state.form.$("last_name").$value;
                full_name.onChange([last_name, field.$value].join(" "));
              }
            }
          },
          {
            name: "last_name",
            label: "LAST_NAME",
            placeholder: "Insert LastName",
            rules: "required|string|between:1,25",
            component: "text",
            hooks: {
              onChange(field) {
                const full_name = field.state.form.$("full_name");
                const first_name = field.state.form.$("first_name").$value;
                full_name.onChange([field.$value, first_name].join(" "));
              }
            }
          },
          {
            name: "full_name",
            label: "FULL_NAME",
            rules: "required|string|between:1,25",
            component: "text",
            disabled: true,
            col_size: 12
          }
        ],
        blueprint: [
          [
            {
              12: ["last_name", "first_name", "full_name"]
            }
          ]
        ]
      }
    }, */
  ],
  blueprint: [
    "_id",
    [
      {
        8: [
          "last_name",
          "first_name",
          "full_name",
          "email",
          "phone",
          "is_active"
        ]
      },
      { 4: ["image"] }
    ],
    [{ 12: ["complex"] }],
    "submit"
  ],
  observers: {
    full_name: [
      {
        key: "focused", // can be any field property
        call: ({ form, field, change }) => {
          console.log({ form, field, change });
        }
      }
    ]
  },
  options: { validateOnChange: true },
  hooks: {
    onSuccess(form) {
      self.root.clients.save(form);
    },
    onError(form) {
      console.log("All form errors", form.errors());
    }
  }
});
