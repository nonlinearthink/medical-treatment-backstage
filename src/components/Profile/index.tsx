import React from 'react';
import styles from './index.less';

interface ProfileProps {
  label: string;
  content: React.ReactNode | string;
  style?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
}

const Profile: React.FC<ProfileProps> = (props) => {
  return (
    <div className={styles.container} style={props.style}>
      <div className={styles.label} style={props.labelStyle}>
        {props.label}
      </div>
      {typeof props.content == 'string' ? (
        <div>{props.content}</div>
      ) : (
        props.content
      )}
    </div>
  );
};

export default Profile;
