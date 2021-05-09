module.exports = plop => {
  const dir = "src";

  plop.setGenerator("module", {
    description: "Create a module and all for them",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your component name (job)?"
      },
      {
        type: "input",
        name: "plural_name",
        message: "What is your component plular name (jobs)?"
      }
    ],
    actions: [
      {
        type: "add",
        force: true,
        path: `${dir}/forms/{{pascalCase name}}Form.config.js`,
        templateFile: "plop-templates/module/Form.config.js.hbs"
      },
      {
        type: "add",
        force: true,
        path: `${dir}/stores/{{lowerCase name}}Store.js`,
        templateFile: "plop-templates/module/StoreItem.js.hbs"
      },
      {
        type: "add",
        force: true,
        path: `${dir}/stores/{{lowerCase plural_name}}Store.js`,
        templateFile: "plop-templates/module/StoreList.js.hbs"
      },
      ...injects
    ]
  });
};

const injects = [
  {
    type: "append",
    path: "src/stores/index.js",
    pattern: `/* PLOP_INJECT_STORE */`,
    template: `{{lowerCase plural_name}}: types.optional({{pascalCase plural_name}}Store, {}),`
  },
  {
    type: "append",
    path: "src/stores/index.js",
    pattern: `/* PLOP_IMPORT_STORE */`,
    template: `import { {{snakeCase plural_name}}Store } from "./{{lowerCase plural_name}}Store";`
  },
  {
    type: "append",
    path: "src/api/index.js",
    pattern: `/* PLOP_ROUTING_OBJECT */`,
    template: `const {{snakeCase name}} = {
    ...createCrud("{{lowerCase plural_name}}", axios)
  };`
  },
  {
    type: "append",
    path: "src/api/index.js",
    pattern: `/* PLOP_ROUTING_OBJECT_EXPORT */`,
    template: `{{pascalCase name}},`
  },
  {
    type: "append",
    path: "src/forms.js",
    pattern: `/* PLOP_IMPORT_FORM_CONFIG */`,
    template: `import { {{pascalCase name}}FormConfig } from "forms/{{pascalCase name}}Form.config";`
  },
  {
    type: "append",
    path: "src/forms.js",
    pattern: `/* PLOP_IMPORT_FORM */`,
    template: `{{lowerCase name}}Form: {{pascalCase name}}FormConfig(self),`
  },
  {
    type: "append",
    path: "src/routes.js",
    pattern: `/* PLOP_IMPORT_ROUTES */`,
    template: `
    {{lowerCase plural_name}}: View.create({
    name: "{{lowerCase plural_name}}",
    path: "/{{lowerCase plural_name}}",
    title: "{{upperCase plural_name}}",
    component: <ListBuilder />,
    hooks: {
      async beforeEnter(self) {
        self.router.setProps({
          modelName: "{{lowerCase plural_name}}",
          filter: [[{ title: "text" }]],
          columns: [
            {
              title: "TITLE",
              name: "title",
              type: "text"
            },
            {
              title: "ACTIONS",
              name: "actions",
              type: "actions",
              options: {
                view: "{{lowerCase name}}"
              }
            }
          ]
        });
        await self.root.{{lowerCase plural_name}}.pullRows();
      }
    }
  },
  {{lowerCase name}}: View.create({
    name: "{{lowerCase name}}",
    path: "/clients/{{lowerCase plural_name}}/:id",
    title: "{{upperCase name}}_EDITOR",
    component: <FormBuilder />,
    hooks: {
      async beforeEnter(self) {
        self.router.setProps({ form: "{{lowerCase name}}Form" });
        await self.root.{{lowerCase plural_name}}.getById(self.router.params.id, true);
      }
    }
  }),`
  },
  {
    type: "append",
    path: "src/menu.js",
    pattern: `/* PLOP_IMPORT_MENU */`,
    template: `{
        title: "{{upperCase plural_name}}_LIST",
        icon: "container",
        path: "/{{lowerCase plural_name}}",
        view: "{{lowerCase plural_name}}"
      },
      {
        title: "ADD_{{upperCase name}}",
        icon: "plus-circle",
        path: "/{{lowerCase plural_name}}/create",
        view: "{{lowerCase name}}",
        params: { id: "create" }
      },`
  }
];
