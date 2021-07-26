import React from 'react';
import { UserModelState, Loading, connect, ConnectRC, history } from 'umi';
import ProCard from '@ant-design/pro-card';
import { StatisticModelState } from '@/models/statistic';
import RcResizeObserver from 'rc-resize-observer';
import { FileTextOutlined } from '@ant-design/icons';
import IconFont from '@/components/iconfont';
import styles from './index.less';

interface PageProps {
  user: UserModelState;
  statistic: StatisticModelState;
}

const WelcomePage: ConnectRC<PageProps> = ({ user, statistic }) => {
  const [responsive, setResponsive] = React.useState(false);

  return (
    <div>
      <h1>你好👋 ，{user.adminId}</h1>
      <RcResizeObserver
        key="resize-observer"
        onResize={(offset) => {
          setResponsive(offset.width < 596);
        }}
      >
        <ProCard title="当前系统状态" bordered headerBordered>
          <ProCard split="horizontal">
            <ProCard split="horizontal">
              <ProCard split={responsive ? 'horizontal' : 'vertical'}>
                <ProCard title="CPU核心">{statistic.core}</ProCard>
                <ProCard title="CPU占用率">
                  {Number(statistic.usage * 100).toFixed(2)}%
                </ProCard>
              </ProCard>
              <ProCard split={responsive ? 'horizontal' : 'vertical'}>
                <ProCard title="线程数">{statistic.threads}</ProCard>
                <ProCard title="连接池">{statistic.connections}</ProCard>
              </ProCard>
              <ProCard
                title="HTTP请求"
                split={responsive ? 'horizontal' : 'vertical'}
              >
                <ProCard title="请求总数">{statistic.requests.count}</ProCard>
                <ProCard title="最大请求时间">
                  {Number(statistic.requests.maxCostTime * 10000).toFixed(3)} ms
                </ProCard>
              </ProCard>
            </ProCard>
          </ProCard>
          <ProCard title="资料&文档">
            <a
              className={styles.link}
              href="https://www.piduoduo.xyz/doc/api.html"
              target="_blank"
            >
              <IconFont name="APIwangguan" size={30} className={styles.icon} />
              API文档
            </a>
            <a
              className={styles.link}
              href="https://gitee.com/short-term-2021"
              target="_blank"
            >
              <IconFont
                name="gitee-fill-round"
                size={30}
                className={styles.icon}
              />
              代码仓库（需团队权限）
            </a>
          </ProCard>
        </ProCard>
      </RcResizeObserver>
    </div>
  );
};

export default connect(
  ({
    user,
    statistic,
  }: {
    user: UserModelState;
    statistic: StatisticModelState;
  }) => ({
    user,
    statistic,
  }),
)(WelcomePage);
