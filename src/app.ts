import { message, notification } from 'antd';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { RequestConfig, history, getDvaApp } from 'umi';

const persistConfig = {
  // redux持久化配置
  key: 'root',
  storage: storage,
  whitelist: ['user'],
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
  // prefix: 'https://www.piduoduo.xyz',
  prefix: 'http://localhost:9000',
  requestInterceptors: [
    (url, options) => {
      let store = getDvaApp()._store.getState();
      return {
        url,
        options: {
          ...options,
          headers: {
            token: store.user.isLogin ? store.user.token : '',
          },
        },
      };
    },
  ],
  responseInterceptors: [
    async (response, options) => {
      const { status } = response;
      if (status == 401) {
        message.info('请重新登录');
        history.replace('/login');
      }
      return response;
    },
  ],
  errorHandler: (error) => {
    const { response, data } = error;
    if (data) {
      message.error(data);
    } else {
      message.error('请求失败');
    }
    throw error;
  },
};
