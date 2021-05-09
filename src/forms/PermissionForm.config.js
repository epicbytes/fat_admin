export const PermissionFormConfig = self => ({
  id: "permissionForm",
  fields: [
    {
      name: "_id",
      type: "hidden",
      component: "hidden"
    },
    {
      name: "permissions",
      component: "data_table",
      col_size: 12,
      defaults: {
        _id: "",
        namespace: "defaults",
        headers: [],
        rows: []
      },
      fieldOptions: {
        mode: "booleans"
      }
    }
  ],
  blueprint: ["_id", [{ 12: ["title", "permissions"] }], "submit"],
  options: { validateOnChange: true },
  initials: {
    permissions: {
      _id: "",
      namespace: "defaults",
      headers: [],
      rows: []
    }
  },
  defaults: {
    permissions: {
      _id: "",
      namespace: "defaults",
      headers: [],
      rows: []
    }
  },
  hooks: {
    onSuccess(form) {
      self.root.groups.save(form);
    },
    onError(form) {
      console.log("All form errors", form.errors());
    }
  }
});
