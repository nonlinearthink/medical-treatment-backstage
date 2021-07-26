import { Reducer, Effect } from 'umi';
import * as loginService from '@/services/login';

export interface UserModelState {
  token: string;
  isLogin: boolean;
  adminId: string;
  adminType: string;
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  reducers: {
    save: Reducer;
  };
  effects: {
    login: Effect;
    logout: Effect;
  };
}

const initState: UserModelState = {
  token: '',
  isLogin: false,
  adminId: '',
  adminType: '2',
};

const userModel: UserModelType = {
  namespace: 'user',
  state: initState,
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  effects: {
    *login({ payload = {}, onSuccess, onError }, { call, put }) {
      try {
        console.log(payload);
        const res = yield call(loginService.login, payload);
        console.log('登录请求返回数据: ');
        console.log(res);
        yield put({
          type: 'save',
          payload: {
            token: res.token,
            isLogin: true,
            adminId: payload.params.adminId,
            adminType: res.adminType,
          },
        });
        onSuccess(res);
      } catch (err) {
        onError(err);
      }
    },
    *logout({ onSuccess }, { put }) {
      yield put({
        type: 'save',
        payload: initState,
      });
      onSuccess();
    },
  },
};

export default userModel;
