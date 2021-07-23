/* eslint-disable */

import React from 'react';
import IconAdminRoles from './IconAdminRoles';
import IconYiliaoxiaofeixinxichaxun from './IconYiliaoxiaofeixinxichaxun';

const IconFont = ({ name, ...rest }) => {
  switch (name) {
    case 'AdminRoles':
      return <IconAdminRoles {...rest} />;
    case 'yiliaoxiaofeixinxichaxun':
      return <IconYiliaoxiaofeixinxichaxun {...rest} />;
  }

  return null;
};

export default IconFont;
