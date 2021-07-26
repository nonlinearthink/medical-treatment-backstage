/* eslint-disable */

import { SVGAttributes, FunctionComponent } from 'react';

interface Props extends Omit<SVGAttributes<SVGElement>, 'color'> {
  name:
    | 'APIwangguan'
    | 'gitee-fill-round'
    | 'yiyuan'
    | 'S_anyiyuanguahao'
    | 'yonghu'
    | 'yiliaoxiaofeixinxichaxun';
  size?: number;
  color?: string | string[];
}

declare const IconFont: FunctionComponent<Props>;

export default IconFont;
