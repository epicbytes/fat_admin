import { types, flow, onPatch, applyPatch } from "mobx-state-tree";
import debounce from "lodash/debounce";
import i18next from "i18next";
export function createApiListing(model = null) {
  if (!model) {
    throw new Error("Model is not set");
  }

  return types
    .model("ApiModel", {
      selectedItem: types.safeReference(model),
      rows: types.array(model),
      page: types.optional(types.number, 1),
      pageSize: types.optional(types.number, 20),
      total: types.optional(types.number, 0),
      totalPages: types.optional(types.number, 0),
      status: types.optional(
        types.enumeration("STATUS", ["idle", "pending", "success", "error"]),
        "idle"
      )
    })
    .actions(self => {
      const afterCreate = () => {
        onPatch(self, patch => {
          if (patch.path === "/page") {
            self.needReload();
          }
        });
      };

      const needReload = debounce((resetPage = false) => {
        resetPage && self.resetPage();
        self.pullRows();
      }, 200);

      const setPaging = (page, pageSize) => {
        self.page = page;
        if (pageSize) self.pageSize = pageSize;
      };

      const resetPage = () => {
        self.page = 1;
      };

      const pullRows = flow(function* pullRows() {
        self.setStatus("pending");
        let params = {
          page: self.page,
          pageSize: self.pageSize,
          sort: "-is_active",
          query: {
            ...{ ...self.root.router.params, ...self.root.router.query }
          }
        };
        try {
          const data = yield self.root.app.api[model.name].list(params);
          self.setData(data);
          self.setStatus("success");
        } catch (error) {
          self.root.app.Toast.fire({
            icon: "error",
            title: error.message
          });
          self.setStatus("error");
        }
      });

      const setStatus = status => {
        self.status = status;
      };

      const setData = data => {
        applyPatch(self, { op: "replace", path: "/rows", value: data.rows });
        applyPatch(self, {
          op: "replace",
          path: "/total",
          value: data.total
        });
        applyPatch(self, {
          op: "replace",
          path: "/totalPages",
          value: data.totalPages
        });
      };

      const getById = flow(function* getById(id, updateForm = true) {
        if (id === "create") {
          self.root.app.getForm(`${model.name.toLowerCase()}Form`).reset();
          return Promise.resolve({});
        }
        try {
          let item = yield self.root.app.api[model.name].get(id);
          updateForm &&
            self.root.app
              .getForm(`${model.name.toLowerCase()}Form`)
              .update(item);
          return item;
        } catch (error) {
          self.root.app.Toast.fire({
            icon: "error",
            title: error.message
          });
        }
      });

      const saveValue = flow(function* saveValue(_id, key, value) {
        try {
          const data = yield self.root.app.api[model.name].update({
            _id,
            [key]: value
          });
          return data[key];
        } catch (error) {
          self.root.app.Toast.fire({
            icon: "error",
            title: error.message
          });
          return value;
        }
      });

      const save = flow(function* save(form) {
        const values = { ...form.values() };
        self.setStatus("pending");
        if (values._id === "") {
          delete values._id;
        }
        try {
          const data = yield self.root.app.api[model.name][
            values._id ? "update" : "create"
          ](values);
          form.update(data);
          self.setStatus("success");
          self.root.app.Toast.fire({
            icon: "success",
            title: i18next.t("SUCCESSFULL_SAVED")
          });
        } catch (error) {
          self.setStatus("error");
          self.root.app.Toast.fire({
            icon: "error",
            title: error.message
          });
        }
      });

      return {
        afterCreate,
        setStatus,
        setPaging,
        resetPage,
        pullRows,
        getById,
        setData,
        save,
        saveValue,
        needReload
      };
    });
}
