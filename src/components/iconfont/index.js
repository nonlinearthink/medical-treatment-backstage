/* eslint-disable */

import React from 'react';
import IconApIwangguan from './IconApIwangguan';
import IconGiteeFillRound from './IconGiteeFillRound';
import IconYiyuan from './IconYiyuan';
import IconSAnyiyuanguahao from './IconSAnyiyuanguahao';
import IconYonghu from './IconYonghu';
import IconYiliaoxiaofeixinxichaxun from './IconYiliaoxiaofeixinxichaxun';

const IconFont = ({ name, ...rest }) => {
  switch (name) {
    case 'APIwangguan':
      return <IconApIwangguan {...rest} />;
    case 'gitee-fill-round':
      return <IconGiteeFillRound {...rest} />;
    case 'yiyuan':
      return <IconYiyuan {...rest} />;
    case 'S_anyiyuanguahao':
      return <IconSAnyiyuanguahao {...rest} />;
    case 'yonghu':
      return <IconYonghu {...rest} />;
    case 'yiliaoxiaofeixinxichaxun':
      return <IconYiliaoxiaofeixinxichaxun {...rest} />;
  }

  return null;
};

export default IconFont;
