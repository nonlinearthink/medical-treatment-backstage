/* eslint-disable */

import React from 'react';
import IconSAnyiyuanguahao from './IconSAnyiyuanguahao';
import IconYonghu from './IconYonghu';
import IconYiliaoxiaofeixinxichaxun from './IconYiliaoxiaofeixinxichaxun';

const IconFont = ({ name, ...rest }) => {
  switch (name) {
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
