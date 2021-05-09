import { types, onPatch } from "mobx-state-tree";
import { flow } from "mobx";

const OptionStore = types.model("Option", {
  value: types.optional(types.string, ""),
  title: types.optional(types.string, "")
});

export const DictionaryItemsStore = types
  .model("DictionaryItemStore", {
    value: types.maybeNull(types.array(types.string)),
    filter: types.optional(types.string, ""),
    options: types.array(OptionStore),
    searched: types.array(OptionStore),
    modelName: types.optional(types.string, ""),
    api: types.frozen(),
    state: types.optional(
      types.enumeration("STATE", ["loading", "success", "error"]),
      "loading"
    ),
    error: types.optional(types.string, "")
  })
  .views(self => ({
    get filteredOptions() {
      return self.searched;
    }
  }))
  .actions(self => {
    return {
      afterCreate() {
        if (self.value) {
          self.loadOptions();
        }
        self.loadOptions("setSearched");
        onPatch(self, patch => {
          if (patch.path === "/value") {
            patch.value &&
              patch.value !== "" &&
              patch.value.length > 0 &&
              self.loadOptions();
          }
          if (patch.path === "/filter") {
            self.loadOptions("setSearched");
          }
        });
      },
      setFilter(filter) {
        self.filter = filter;
      },
      loadOptions: flow(function* loadOptions(handler = "setOptions") {
        try {
          if (!self.api[self.modelName]) {
            throw new Error(`Api for ${self.modelName} is not define`);
          }
          self.setState("loading");
          const categories = yield self.api[self.modelName].list({
            fields: "id title",
            pageSize: 100,
            query: {
              ...(handler === "setOptions"
                ? { _id: { $in: [self.value] } }
                : {
                    title: { $regex: self.filter, $options: "i" }
                  })
            }
          });
          self[handler](
            (categories?.rows || []).map(option => ({
              value: option.id,
              title: option.title
            }))
          );
          self.setState("success");
          self.setError("");
        } catch (error) {
          self.setState("error");
          self.setError(error.message);
        }
      }),
      reset() {
        self.options.clear();
        self.searched.clear();
        self.value = null;
      },
      setApi(api) {
        self.api = api;
      },
      setError(error) {
        self.error = error;
      },
      setState(state) {
        self.state = state;
      },
      setOptions(options) {
        self.options = options;
      },
      setSearched(searched) {
        self.searched = searched;
      },
      setValue(value) {
        self.value = value;
      }
    };
  });
