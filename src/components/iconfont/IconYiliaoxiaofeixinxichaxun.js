/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconYiliaoxiaofeixinxichaxun = ({
  size,
  color,
  style: _style,
  ...rest
}) => {
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
        d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z"
        fill={getIconColor(color, 0, '#A6CB50')}
      />
      <path
        d="M622.464 597.312c-85.12 0-154.432-71.04-154.432-158.336a160 160 0 0 1 28.16-90.88 150.528 150.528 0 0 0-97.984-36.48c-84.736 0-153.344 70.4-153.344 157.184 0 45.248 18.56 86.016 48.448 114.688l1.664 1.6 190.528 186.048a36.928 36.928 0 0 0 45.888 0l158.72-155.008-24.576-25.152a148.288 148.288 0 0 1-43.072 6.336z m210.432-27.52l-83.008-83.136a124.608 124.608 0 0 0-75.136-169.024 154.496 154.496 0 0 0-41.408-5.952A124.48 124.48 0 0 0 512 435.968c0 68.544 55.744 124.416 124.352 124.416 18.112 0 35.2-4.032 50.752-10.944l37.76 37.76 45.312 45.312a44.16 44.16 0 0 0 75.712-31.36 44.032 44.032 0 0 0-12.992-31.36zM634.368 512c-42.88 0-77.824-34.944-77.824-77.888s34.944-77.952 77.824-77.952a78.08 78.08 0 0 1 77.952 77.952A78.08 78.08 0 0 1 634.368 512z"
        fill={getIconColor(color, 1, '#FFFFFF')}
      />
    </svg>
  );
};

IconYiliaoxiaofeixinxichaxun.defaultProps = {
  size: 18,
};

export default IconYiliaoxiaofeixinxichaxun;
