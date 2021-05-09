import { types, getRoot, flow } from "mobx-state-tree";
import { createPersist } from "./extensions/createPersist";
import { createConfiguration } from "./extensions/createConfiguration";
import { createApi } from "./extensions/createApi";
import { createLocalization } from "./extensions/createLocalization";
import { createAuthorization } from "./extensions/createAuthorization";
import { createNotifications } from "./extensions/createNotifications";
import { createForms } from "./extensions/createForms";

const defaultAppTitle = "AppTitle";

const Trak = types.model("Trak", {
  num: types.identifier,
  lon: types.number,
  lat: types.number,
  speed: types.number
});

export const APPStore = types.compose(
  types
    .model("APPStore", {
      appName: types.optional(types.string, "APPAdmin :: "),
      appTitle: types.optional(types.string, defaultAppTitle),
      sidebarOpened: false,
      online: false,
      trackers: types.map(Trak)
    })
    .views(self => ({
      get root() {
        return getRoot(self);
      }
    }))
    .actions(self => {
      const setAppTitle = appTitle => {
        if (!appTitle) {
          self.appTitle = defaultAppTitle;
        } else {
          self.appTitle = appTitle;
        }
      };
      const addTrack = track => {
        self.trackers.set(track.num, track);
      };
      const toggleSidebar = () => {
        self.sidebarOpened = !self.sidebarOpened;
      };

      const setOnline = online => {
        self.online = online;
      };

      const afterCreate = () => {
        self.online = navigator.onLine;
        createPersist("UI", self, {
          whitelist: ["sidebarOpened"]
        });
        createPersist("AUTH", self, {
          whitelist: ["token", "user"]
        });
        self.initI18next();
      };

      const uploadFile = flow(function* uploadFile(data, params) {
        try {
          const file = yield self.api.File.upload(data, params);
          return file;
        } catch (error) {
          self.Toast.fire({ icon: "error", title: error.message });
        }
      });
      return {
        addTrack,
        afterCreate,
        setAppTitle,
        setOnline,
        toggleSidebar,
        uploadFile
      };
    }),
  createApi(),
  createAuthorization(),
  createLocalization(),
  createNotifications(),
  createForms(),
  createConfiguration()
);
