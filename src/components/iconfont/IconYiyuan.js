/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconYiyuan = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg
      viewBox="0 0 1024 1024"
      width={size + 'px'}
      height={size + 'px'}
      style={style}
      {...rest}
    >
      <path
        d="M516.5 530.6m-428.9 0a428.9 428.9 0 1 0 857.8 0 428.9 428.9 0 1 0-857.8 0Z"
        fill={getIconColor(color, 0, '#E61211')}
      />
      <path
        d="M516.5 530.6m-367.8 0a367.8 367.8 0 1 0 735.6 0 367.8 367.8 0 1 0-735.6 0Z"
        fill={getIconColor(color, 1, '#FFFFFF')}
      />
      <path
        d="M516.5 530.6m-324.4 0a324.4 324.4 0 1 0 648.8 0 324.4 324.4 0 1 0-648.8 0Z"
        fill={getIconColor(color, 2, '#E61211')}
      />
      <path
        d="M715.6 588.6H574.5v141.1H458.6V588.6H317.5V472.7h141.1V331.6h115.9v141.1h141.1z"
        fill={getIconColor(color, 3, '#FFFFFF')}
      />
    </svg>
  );
};

IconYiyuan.defaultProps = {
  size: 18,
};

export default IconYiyuan;
