import { onSnapshot, applyPatch } from "mobx-state-tree";
import { pick } from "utils/pick";

export const createPersist = (name, store, options = {}) => {
  const { jsonify = true, whitelist } = options;
  const storage = window.localStorage;

  onSnapshot(store, _snapshot => {
    const snapshot = pick(whitelist, _snapshot);
    const data = !jsonify ? snapshot : JSON.stringify(snapshot);
    storage.setItem(name, data);
  });

  const persistData = storage.getItem(name);
  let value;

  if (!persistData) return;
  try {
    value = JSON.parse(persistData);
  } catch (e) {
    value = persistData;
  } finally {
    if (!value) return;
    let patches = [];
    for (let v in value) {
      patches.push({ op: "replace", path: `/${v}`, value: value[v] });
    }
    applyPatch(store, patches);
  }
};
