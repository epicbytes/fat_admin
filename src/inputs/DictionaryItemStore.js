import { types, onPatch } from "mobx-state-tree";
import { flow } from "mobx";

const OptionStore = types.model("Option", {
  value: types.optional(types.string, ""),
  title: types.optional(types.string, "")
});

export const DictionaryItemStore = types
  .model("DictionaryItemStore", {
    value: types.maybeNull(types.string),
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
      let concatAndDeDuplicateObjectsDeep = (p, ...arrs) =>
        [...new Set([].concat(...arrs).map(a => JSON.stringify(a)))].map(a =>
          JSON.parse(a)
        );

      return concatAndDeDuplicateObjectsDeep(
        "value",
        self.options,
        self.searched
      );
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
            patch.value && patch.value !== "" && self.loadOptions();
          }
          if (patch.path === "/filter") {
            self.loadOptions("setSearched");
          }
        });
      },
      setFilter(filter) {
        self.filter = filter;
      },
      reset() {
        self.options.clear();
        self.searched.clear();
        self.value = null;
      },
      loadOptions: flow(function* loadOptions(handler = "setOptions") {
        try {
          if (!self.api[self.modelName]) {
            throw new Error(`Api for ${self.modelName} is not define`);
          }
          self.setState("loading");
          const categories = yield self.api[self.modelName].list({
            fields: "title",
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
              value: option._id,
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
      setApi(api) {
        self.api = api;
      },
      setState(state) {
        self.state = state;
      },
      setError(error) {
        self.error = error;
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
