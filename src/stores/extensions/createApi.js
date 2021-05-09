import { types } from "mobx-state-tree";
import Axios from "axios";
import api from "api";
import Socket from "./Socket";

export function createApi() {
  return types
    .model("API", {
      baseUrl: types.optional(types.string, process.env.REACT_APP_ADMIN_URL)
    })
    .volatile(self => ({
      axios: Axios.create({
        crossdomain: true
      }),
      eventSource: types.frozen(),
      socket: new Socket({ store: self }),
      api: types.frozen()
    }))
    .actions(self => {
      function showInfo(e) {
        self.Toast.fire(e.data);
      }
      const afterCreate = () => {
        self.assignApi(api);
        self.eventSource = new EventSource(`${self.baseUrl}/stream`, {
          authorizationHeader: self.token
        });
        self.eventSource.addEventListener("coords", event => {
          let trak = JSON.parse(event.data);
          if (trak) {
            showInfo(event);
            self.addTrack(trak);
          }
          return;
        });
        self.eventSource.onopen = function() {
          console.log("Connection to server opened.");
        };
        self.axios.interceptors.request.use(
          async request => {
            try {
              request.baseURL = self.baseUrl;
              request.headers["X-CLIENT-TYPE"] = "ADMIN";
              request.headers["Access-Control-Allow-Origin"] = "*";
              if (self.token) {
                request.headers.Authorization = `Bearer ${self.token}`;
              }
              if (!!request.params?.query) {
                request.params.query = JSON.stringify(request.params.query);
              }
              return request;
            } catch (error) {
              //console.log(error);
            }
          },
          err => {
            return Promise.reject(err);
          }
        );
        self.axios.interceptors.response.use(
          response => response.data,
          err => {
            return Promise.reject(err);
          }
        );
      };
      const assignApi = api => {
        self.api = { ...self.api, ...api(self.axios) };
      };
      return {
        afterCreate,
        assignApi
      };
    });
}
