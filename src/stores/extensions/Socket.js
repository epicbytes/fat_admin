import io from "socket.io-client";

class Socket {
  constructor({ store }) {
    this.io = null;
    this.store = store;
    this.baseUrl = null;
  }

  setBaseUrl = baseUrl => {
    if (this.io) {
      this.io.close();
    }
    this.baseUrl = baseUrl;
    this.login();
  };

  login = () => {
    return new Promise((resolve, reject) => {
      this.io = io(this.baseUrl, {
        query: { token: this.store.token },
        transports: ["websocket"]
      });
      this.io.once("logined", userData => {
        this.store.setUser(userData);
        resolve(this.store.user);
      });
    });
  };

  call = (action, params) => {
    if (!this.io) return;
    return new Promise((resolve, reject) => {
      this.io.emit("call", action, params, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  };

  subscribe = ({ name }) => {
    if (!this.io) return;
    return new Promise((resolve, reject) => {
      this.io.emit("call", "admin.join", {
        name
      });

      this.io.on("rooms", roomsData => {
        this.store.setSubscribe(roomsData);
        resolve(this.store.rooms);
      });
    });
  };

  unsubscribe = ({ name }) => {
    if (!this.io) return;
    return new Promise((resolve, reject) => {
      this.io.emit("call", "admin.leave", {
        name
      });
      this.io.off("rooms");
      resolve();
    });
  };
}

export default Socket;
