import { types, applySnapshot, getParent, applyPatch } from "mobx-state-tree";
import { v1 } from "uuid";

const Cell = types
  .model("Cell", {
    id: types.identifier,
    value: types.union(types.string, types.boolean, types.undefined)
  })
  .views(self => ({
    get parent() {
      return getParent(self, 2);
    },
    get isFirst() {
      return self.parent.headers.indexOf(self) === 0;
    }
  }))
  .actions(self => ({
    setValue(value) {
      self.value = value;
    },
    remove() {
      self.parent.removeHeader(self);
    }
  }));

const Row = types
  .model("Row", {
    id: types.identifier,
    source: types.optional(types.string, ""),
    items: types.array(Cell)
  })
  .views(self => ({
    get parent() {
      return getParent(self, 2);
    },
    get isEdited() {
      return self.parent?.editedRow?.id === self.id;
    }
  }))
  .actions(self => ({
    setSource(source) {
      self.source = source;
    },
    setEditedRow() {
      self.parent.setEditedRow(self.id);
    },
    remove() {
      self.parent.setEditedRow(null);
      setTimeout(() => self.parent.removeRow(self), 100);
    }
  }));

export const Data = types
  .model("Data", {
    _id: types.identifier,
    namespace: types.optional(types.string, ""),
    headers: types.optional(types.array(Cell), []),
    editedRow: types.maybeNull(types.reference(Row)),
    rows: types.optional(types.array(Row), []),
    search: types.optional(types.string, "")
  })
  .views(self => ({
    get parent() {
      return getParent(self);
    },
    get filteredRows() {
      const rx = new RegExp(self.search, "igm");
      return self.rows.filter(row => rx.test(row.source));
    }
  }))
  .actions(self => ({
    setSearch(search) {
      self.search = search;
    },
    addHeader(value) {
      self.headers.push({ id: v1(), value });
      for (let row of self.rows) {
        applyPatch(row, {
          op: "add",
          path: "/items/-",
          value: { id: v1(), value: "" }
        });
      }
    },
    removeHeader(header) {
      const headerIndex = self.headers.indexOf(header);
      self.headers.splice(headerIndex, 1);
      for (let row of self.rows) {
        applyPatch(row, {
          op: "remove",
          path: `/items/${headerIndex - 1}`
        });
      }
    },
    addRow(source = "") {
      applyPatch(self.rows, {
        op: "add",
        path: source ? "/-" : "/",
        value: {
          id: v1(),
          source,
          items: Array(
            (self.headers.length > 0 && self.headers.length - 1) || 0
          )
            .fill(0)
            .map(_ => ({
              id: v1(),
              value: ""
            }))
        }
      });
    },
    removeRow(row) {
      self.rows.splice(self.rows.indexOf(row), 1);
    },
    setEditedRow(id) {
      self.editedRow = id;
    }
  }));

const Option = types.model("Options", {
  key: types.string,
  value: types.string
});

const Editor = types
  .model("Editor", {
    mode: types.optional(types.enumeration(["strings", "booleans"]), "strings"),
    data: types.maybeNull(Data),
    options: types.optional(types.array(Option), [])
  })
  .views(self => ({
    get selectedHeaders() {
      return (self.data?.headers || []).map(h => h.value);
    },
    get availableOptions() {
      return self.options.filter(
        ao => self.selectedHeaders.indexOf(ao.key) === -1
      );
    }
  }))
  .actions(self => ({
    setOptions(options) {
      applySnapshot(self.options, options);
    },
    setData(data, mode) {
      applySnapshot(self, { data, mode });
    },
    setPatch(patch) {
      for (let p of patch) {
        if (
          self.data.rows.find(r => {
            return r.source !== p.key;
          })
        ) {
          self.data.addRow(p.key);
        }
      }
    }
  }));

export default Editor;
