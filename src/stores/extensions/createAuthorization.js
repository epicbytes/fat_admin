import {
  types,
  getRoot,
  onPatch,
  flow,
  applySnapshot,
  applyPatch
} from "mobx-state-tree";
import i18next from "i18next";

const UserStore = types
  .model("UserStore", {
    _id: types.optional(types.string, ""),
    first_name: types.optional(types.string, ""),
    last_name: types.optional(types.string, ""),
    image: types.optional(types.string, ""),
    email: types.optional(types.string, ""),
    phone: types.optional(types.string, ""),
    group: types.optional(types.string, "")
  })
  .views(self => ({
    get root() {
      return getRoot(self);
    },
    get imageUrl() {
      return self.root.app.baseUrl + "/files/" + self.image;
    },
    get fullName() {
      return `${self.first_name} ${self.last_name}`;
    }
  }));

export function createAuthorization() {
  return types
    .model({
      is_auth: false,
      token: types.maybeNull(types.string),
      user: types.optional(UserStore, {})
    })
    .views(self => ({
      get root() {
        return getRoot(self);
      }
    }))
    .actions(self => {
      const afterCreate = () => {
        if (self.token) {
          setIsAuth(true);
        }
        onPatch(self, patch => {
          //Мониторим изменения поля токена
          if (patch.path === "/token") {
            if (!patch.value) {
              self.checkUser();
            }
          }
          //Мониторим изменение статуса авторизации
          if (patch.path === "/is_auth") {
            if (!!patch.value) {
              self.root.router.setView("dashboard");
            } else {
              self.root.router.setView("login");
            }
          }
        });
      };

      const login = flow(function* login({ email, password }) {
        try {
          const loginData = yield self.api.User.login({
            email,
            password
          });
          self.setUserData(loginData);
          self.setToken(loginData.token);
          self.setIsAuth(true);
          self.Toast.fire({
            icon: "success",
            title: i18next.t("SUCCESS_LOGIN")
          });
        } catch (error) {
          self.Toast.fire({
            icon: "error",
            title: i18next.t("ERROR_WHILE_LOGIN"),
            description: i18next.t(error.message)
          });
        }
      });

      const setUserData = userData => {
        applySnapshot(self.user, userData);
      };

      const setToken = token => {
        applyPatch(self, { op: "replace", path: "/token", value: token });
      };

      const setIsAuth = is_auth => {
        self.is_auth = is_auth;
      };

      //Выход из приложения, удаление данных
      const logout = () => {
        self.setToken(null);
        self.setUserData({});
        self.setIsAuth(false);
      };

      //Отправка запроса с токеном на эндпоинт проверки данных пользователя
      const checkUser = flow(function* checkUser() {
        try {
          const user = yield self.api.User.check(self.token);
          self.setUserData(user);
          self.setIsAuth(true);
        } catch (error) {
          //console.log(error);
        }
      });

      return {
        afterCreate,
        login,
        setIsAuth,
        setUserData,
        setToken,
        logout,
        checkUser
      };
    });
}
