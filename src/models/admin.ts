import { Reducer, Effect } from 'umi';
import * as adminService from '@/services/admin';

export interface AdminListItem {
  adminId: string;
  adminType: string;
  createTime: Date;
  deleteMark: boolean;
}

export interface AdminModelState {
  adminList: AdminListItem[];
}

export interface AdminModelType {
  namespace: 'admin';
  state: AdminModelState;
  reducers: {
    save: Reducer;
  };
  effects: {
    getAdminList: Effect;
    // updateAdmin: Effect;
    // deleteAdmin: Effect;
  };
}

const initState: AdminModelState = {
  adminList: [],
};

const adminModel: AdminModelType = {
  namespace: 'admin',
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
    *getAdminList({ payload = {} }, { call, put }) {
      const res = yield call(adminService.getAdminList, { params: payload });
      console.log('登录请求返回数据: ');
      console.log(res);
      yield put({
        type: 'save',
        payload: {
          adminList: res.data,
        },
      });
    },
  },
};

export default adminModel;
