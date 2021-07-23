import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { RequestConfig, history } from 'umi';

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
    extraEnhancers: [persistEnhancer()],
  },
};

export const request: RequestConfig = {
  prefix: 'https://www.piduoduo.xyz',
  requestInterceptors: [
    (url, options) => {
      return {
        url,
        options: {
          ...options,
          headers: {
            token: '',
          },
        },
      };
    },
  ],
  responseInterceptors: [
    async (response, options) => {
      const { status } = response;
      if (status == 401) {
        history.replace('/login');
      }
      return response;
    },
  ],
  errorHandler: () => {},
};
