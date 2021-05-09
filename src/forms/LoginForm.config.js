export const LoginFormConfig = self => ({
  id: "loginForm",
  fields: [
    {
      name: "email",
      label: "Email",
      placeholder: "Insert Email",
      rules: "required|email|string|between:5,25"
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "password",
      rules: "required|string|between:5,25"
    }
  ],
  options: { validateOnChange: true },
  hooks: {
    onSuccess(form) {
      self.login(form.values());
    },
    onError(form) {
      console.log("All form errors", form.errors());
    }
  }
});
