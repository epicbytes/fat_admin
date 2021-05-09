import { types, getRoot } from "mobx-state-tree";
import MobxReactForm from "mobx-react-form";
import dvr from "mobx-react-form/lib/validators/DVR";
import validatorjs from "validatorjs";
import MobxReactFormDevTools from "mobx-react-form-devtools";

export const Form = types
  .model("Form", {
    id: types.identifier,
    defaults: types.frozen(),
    initials: types.frozen(),
    hooks: types.frozen(),
    options: types.frozen(),
    handlers: types.frozen(),
    fields: types.frozen(),
    plugins: types.frozen(),
    blueprint: types.maybeNull(
      types.array(
        types.union(
          types.string,
          types.array(types.map(types.array(types.string)))
        )
      )
    )
  })
  .volatile(self => ({
    form: types.frozen
  }))
  .actions(self => {
    const afterCreate = () => {
      const default_plugins = {
        dvr: dvr(validatorjs)
      };
      const {
        hooks,
        fields,
        options,
        handlers,
        plugins,
        defaults,
        initials
      } = self;

      self.form = new MobxReactForm(
        { fields, defaults, initials },
        {
          hooks,
          options,
          handlers,
          plugins: { ...default_plugins, ...plugins }
        }
      );
      MobxReactFormDevTools.register({ form: self.form });
    };

    const addToBlueprint = (item, position) => {
      self.blueprint.push(item);
    };

    return {
      addToBlueprint,
      afterCreate
    };
  });

export function createForms() {
  return types
    .model({
      forms: types.optional(types.map(Form), {})
    })
    .views(self => ({
      get root() {
        return getRoot(self);
      }
    }))
    .actions(self => ({
      getForm(form) {
        return self.forms.get(form)?.form;
      }
    }));
}
