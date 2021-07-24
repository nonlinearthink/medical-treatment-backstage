/* eslint-disable */

import React from 'react';
import IconYonghu from './IconYonghu';
import IconYiliaoxiaofeixinxichaxun from './IconYiliaoxiaofeixinxichaxun';

const IconFont = ({ name, ...rest }) => {
  switch (name) {
    case 'yonghu':
      return <IconYonghu {...rest} />;
    case 'yiliaoxiaofeixinxichaxun':
      return <IconYiliaoxiaofeixinxichaxun {...rest} />;
  }

  return null;
};

export default IconFont;
