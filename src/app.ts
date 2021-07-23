import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  // redux持久化配置
  key: 'root',
  storage: storage,
  whitelist: ['admin'],
};

const persistEnhancer =
  () => (createStore) => (reducer, initialState, enhancer) => {
    const store = createStore(
      persistReducer(persistConfig, reducer),
      initialState,
      enhancer,
    );
    const persist = persistStore(store);
    return { ...store, persist };
  };

export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
      console.error(err.message);
    },
    extraEnhancers: [persistEnhancer()],
  },
};

// window.onload = () => persistStore(window.g_app._store);
// console.log(window.g_app);
