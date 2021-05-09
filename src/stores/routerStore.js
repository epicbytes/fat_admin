import {
  types,
  flow,
  getRoot,
  getSnapshot,
  applySnapshot
} from "mobx-state-tree";
import { keys } from "mobx";
import { View } from "./viewStore";
import route from "path-match";
import { reaction } from "mobx";
import qs from "qs";
import { createBrowserHistory } from "history";

const createRouter = routes => {
  const matchers = Object.keys(routes).map(path => [
    route()(path),
    routes[path]
  ]);
  return path => {
    return matchers.some(([matcher, f]) => {
      const result = matcher(path);
      if (result === false) return false;
      f(result);
      return true;
    });
  };
};

export const startRouter = routerStore => {
  const history = createBrowserHistory();
  routerStore.setHistory(history);

  const routes = createRouter(routerStore.routes);
  history.listen((location, action) => {
    switch (action) {
      case "POP":
        routes(location.pathname);
        break;
      default:
        break;
    }
  });

  reaction(
    () => [routerStore.currentUrl, routerStore.query],
    ([url, query]) => {
      if (history.location.pathname !== url) {
        history.push(url + qs.stringify(query, { addQueryPrefix: true }));
      }
    }
  );
  routes(history.location.pathname);
};

export const RouterStore = types
  .model("RouterStore", {
    views: types.map(View),
    currentView: types.maybe(types.reference(View)),
    params: types.frozen(),
    query: types.frozen(),
    props: types.frozen(),
    isLoading: false
  })
  .views(self => ({
    get root() {
      return getRoot(self);
    },
    get currentUrl() {
      return self.currentView ? self.currentView.formatUrl(self.params) : "";
    },
    get routes() {
      let routes = {};
      let keyList = keys(self.views);
      keyList.forEach(k => {
        const view = self.views.get(k);
        routes[view.path] = params => self.setView(view, params);
      });
      return routes;
    }
  }))
  .actions(self => {
    let _history = null;
    let _runningSetView = null;
    let _queuedSetView = null;

    const _spinWait = resolve => setTimeout(resolve, 100);
    return {
      setHistory(history) {
        self.query = {
          ...self.query,
          ...qs.parse(history.location.search, {
            ignoreQueryPrefix: true
          })
        };
        _history = history;
      },
      setQueryParam(query, value) {
        self.query = { ...self.query, [query]: value };
        _history.replace(
          _history.location.pathname +
            qs.stringify(self.query, { addQueryPrefix: true })
        );
      },
      resetQuery() {
        self.query = {};
        _history.replace(_history.location.pathname);
      },
      replace(path) {
        _history.replace(path);
      },
      push(path) {
        _history.push(path);
      },
      goBack() {
        _history.goBack();
      },
      goForward() {
        _history.goForward();
      },
      setLoading(isLoading) {
        self.isLoading = isLoading;
      },
      getByName(name) {
        return self.views.get(name);
      },
      setView: flow(function*(view, params, query) {
        let _view;
        if (typeof view === "string") {
          _view = self.getByName(view);
        } else {
          _view = view;
        }

        if (_view.auth && !self.root.app.is_auth) {
          _history.push("/login");
          _view = self.getByName("login");
        }

        const thisSetView = {
          key: _view.formatUrl(params, query),
          view: _view,
          params
        };

        if (_runningSetView) {
          // if setView is already running or queued on this route, ignore
          if (
            _runningSetView.key === thisSetView.key ||
            (_queuedSetView && _queuedSetView.key === thisSetView.key)
          ) {
            return;
          }

          _queuedSetView = thisSetView;

          // spin this thread until it is no longer queued
          while (_queuedSetView) {
            yield new Promise(_spinWait);
          }

          // check that this is still the setView to process
          if (_runningSetView.key !== thisSetView.key) {
            return;
          }
        }

        _runningSetView = thisSetView;

        // save a snapshot to rollback to if something goes wrong
        const rootSnapshot = getSnapshot(self.root);

        const rollback = () => {
          applySnapshot(self.root, rootSnapshot);
          if (_queuedSetView) {
            _runningSetView = _queuedSetView;
            self.currentView = _runningSetView.view;
            self.params = _runningSetView.params;
            _queuedSetView = null;
          } else {
            self.isLoading = false;
          }
        };

        // before exit old view
        const oldView = self.currentView;
        const oldParams = self.params;

        if (oldView && oldView.beforeExit) {
          if ((yield oldView.beforeExit(oldParams)) === false) {
            return rollback();
          }
        }

        // check if route has been changed
        if (_queuedSetView) return rollback();

        // block out page for loading
        self.setLoading(true);

        // update current url
        self.currentView = _view;
        self.params = params || {};
        self.query = query || self.query;

        // before enter new view
        if (_view.beforeEnter) {
          if ((yield _view.beforeEnter(params)) === false) {
            return rollback();
          }
        }

        // check if route has been changed
        if (_queuedSetView) return rollback();

        // on exit old view
        if (oldView && oldView.onExit) {
          yield self.currentView.onExit(oldParams);
        }

        // check if route has been changed
        if (_queuedSetView) return;

        // free up page to render
        self.props = self.props || {};
        self.setLoading(false);

        // on enter new view
        if (_view.onEnter) {
          yield _view.onEnter(params);
        }

        // check if route has been changed
        if (_queuedSetView) return;

        _runningSetView = null;
      }),
      setProps(props) {
        self.props = props;
      }
    };
  });
