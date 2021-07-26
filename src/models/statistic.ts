import { Reducer, Effect, Subscription } from 'umi';
import * as statisticService from '@/services/statistic';

export interface StatisticModelState {
  requests: {
    count: number;
    maxCostTime: number;
  };
  threads: number;
  connections: number;
  core: number;
  usage: number;
}

export interface StatisticModelType {
  namespace: 'statistic';
  state: StatisticModelState;
  reducers: {
    save: Reducer;
  };
  effects: {
    getServerRequest: Effect;
    getLiveThread: Effect;
    getConnection: Effect;
    getCpuCount: Effect;
    getCpuUsage: Effect;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const initState: StatisticModelState = {
  requests: {
    count: 0,
    maxCostTime: 0,
  },
  threads: 0,
  connections: 0,
  core: 0,
  usage: 0,
};

const adminModel: StatisticModelType = {
  namespace: 'statistic',
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
    *getServerRequest({}, { call, put }) {
      const res = yield call(statisticService.getServerRequest);
      //   console.log('请求返回数据: ');
      //   console.log(res);
      yield put({
        type: 'save',
        payload: {
          requests: {
            count: res.measurements[0].value,
            maxCostTime: res.measurements[2].value,
          },
        },
      });
    },
    *getLiveThread({}, { call, put }) {
      const res = yield call(statisticService.getLiveThread);
      //   console.log('请求返回数据: ');
      //   console.log(res);
      yield put({
        type: 'save',
        payload: {
          threads: res.measurements[0].value,
        },
      });
    },
    *getConnection({}, { call, put }) {
      const res = yield call(statisticService.getConnection);
      //   console.log('请求返回数据: ');
      //   console.log(res);
      yield put({
        type: 'save',
        payload: {
          connections: res.measurements[0].value,
        },
      });
    },
    *getCpuCount({}, { call, put }) {
      const res = yield call(statisticService.getCpuCount);
      //   console.log('请求返回数据: ');
      //   console.log(res);
      yield put({
        type: 'save',
        payload: {
          core: res.measurements[0].value,
        },
      });
    },
    *getCpuUsage({}, { call, put }) {
      const res = yield call(statisticService.getCpuUsage);
      //   console.log('请求返回数据: ');
      //   console.log(res);
      yield put({
        type: 'save',
        payload: {
          usage: res.measurements[0].value,
        },
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/welcome') {
          dispatch({ type: 'getServerRequest' });
          dispatch({ type: 'getLiveThread' });
          dispatch({ type: 'getConnection' });
          dispatch({ type: 'getCpuUsage' });
          dispatch({ type: 'getCpuCount' });
        }
      });
    },
  },
};

export default adminModel;
