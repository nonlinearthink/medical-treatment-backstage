import { Reducer, Effect, history } from 'umi';
import * as loginService from '@/services/login';
import { message } from 'antd';

export interface AdminModelState {
  token: string;
  isLogin: boolean;
  adminId: string;
  adminType: string;
}

export interface AdminModelType {
  namespace: 'admin';
  state: AdminModelState;
  reducers: {
    save: Reducer;
  };
  effects: {
    login: Effect;
  };
}

const authModel: AdminModelType = {
  namespace: 'admin',
  state: { token: '', isLogin: false, adminId: '', adminType: '2' },
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
        const res = yield call(loginService.login, payload);
        console.log('登录请求返回数据: ');
        console.log(res);
        yield put({
          type: 'save',
          payload: {
            token: res.token,
            isLogin: true,
            adminId: payload.adminId,
            adminType: res.adminType,
          },
        });
        onSuccess(res);
      } catch (err) {
        onError(err);
      }
    },
  },
};

export default authModel;
