import routes from '../routes';

export const createStore = () => {
  const store = {
    routes: {
      get allRoutes() {
        return routes;
      }
    }
  };

  return store;
};

export type TStore = ReturnType<typeof createStore>;
