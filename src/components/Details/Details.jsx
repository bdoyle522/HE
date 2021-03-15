import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {
  Typography,
  Divider,
  Container,
  Tooltip,
  Card,
} from '@material-ui/core';
import {
  ArrowBack,
  Star,
  GitHub,
  Language,
  PermIdentity,
  Visibility,
} from '@material-ui/icons';

import { UNKNOWN } from '../../constants';

import styles from './Details.module.css';

/**
 * Details page, containing selected repository information
 */
export const Details = ({ selectedRepo, goBack }) => {
  if (!selectedRepo) {
    return null;
  }
  return (
    <div className={styles.detailsWrapper}>
      <ArrowBack className={styles.goBack} onClick={goBack} fontSize="large" />
      <Container>
        <Card className={styles.details}>
          <div className={styles.header}>
            <Typography variant="h3" className={styles.headerText}>
              {selectedRepo.name}
              <a
                className={cn(styles.title, styles.github)}
                href={selectedRepo.svn_url}
                rel="noreferrer"
                target="_blank"
              >
                <GitHub />
              </a>
            </Typography>
            <Typography variant="caption" className={styles.author}>
              Author:{' '}
              <a
                href={selectedRepo.owner?.html_url}
                rel="noreferrer"
                target="_blank"
              >
                {selectedRepo.owner?.login}
              </a>
            </Typography>
            <Typography variant="body2" className={styles.description}>
              {selectedRepo.description}
            </Typography>
          </div>
          <Divider classes={{ root: styles.divider }} variant="fullWidth" />
          <div className={styles.minorDetails}>
            <Tooltip title="Number of Times Starred">
              <div className={styles.infoGroup}>
                <Star className={cn(styles.star, styles.icon)} />
                <Typography variant="body1">
                  {selectedRepo.stargazers_count ?? UNKNOWN}
                </Typography>
              </div>
            </Tooltip>
            <Tooltip title="Watchers">
              <div className={styles.infoGroup}>
                <Visibility className={styles.icon} />
                <Typography variant="body1">
                  {selectedRepo.watchers_count ?? UNKNOWN}
                </Typography>
              </div>
            </Tooltip>
            <Tooltip title="Main Language">
              <div className={styles.infoGroup}>
                <Language className={styles.icon} />
                <Typography variant="body1">
                  {selectedRepo.language ?? UNKNOWN}
                </Typography>
              </div>
            </Tooltip>
            <Tooltip title="License">
              <div className={styles.infoGroup}>
                <PermIdentity className={styles.icon} />
                <Typography variant="body1">
                  {selectedRepo.license?.name ?? UNKNOWN}
                </Typography>
              </div>
            </Tooltip>
          </div>
        </Card>
      </Container>
    </div>
  );
};

Details.propTypes = {
  selectedRepo: PropTypes.object.isRequired,
  goBack: PropTypes.func.isRequired,
};
