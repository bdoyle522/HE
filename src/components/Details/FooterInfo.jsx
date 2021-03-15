import PropTypes from 'prop-types';
import cn from 'classnames';
import { Typography, Tooltip } from '@material-ui/core';

import styles from './FooterInfo.module.css';

export const FooterInfo = ({ title, className, icon: Icon, value }) => (
  <Tooltip title={title}>
    <div className={styles.infoGroup}>
      <Icon className={cn(styles.icon, className)} />
      <Typography variant="body1">{value}</Typography>
    </div>
  </Tooltip>
);

FooterInfo.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  icon: PropTypes.object.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
