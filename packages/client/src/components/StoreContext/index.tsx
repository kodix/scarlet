import React, { useContext } from 'react';
import { useLocalStore } from 'mobx-react-lite';
import { createStore, TStore } from '../../store/data.store';

export const storeContext = React.createContext<TStore | null>(null);

export const useStore = () => {
  const store = useContext(storeContext);
  if (!store) {
    throw Error("Store shouldn't be null");
  }
  return store;
};

export const useRoutes = () => {
  const { routes } = useStore();
  return routes;
};

export const StoreProvider: React.FC = ({ children }) => {
  const store = useLocalStore(createStore);

  return <storeContext.Provider value={store}>{children}</storeContext.Provider>;
};

export default StoreProvider;
