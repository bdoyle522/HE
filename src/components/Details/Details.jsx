import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Typography, Divider, Container, Card } from '@material-ui/core';
import {
  ArrowBack,
  Star,
  GitHub,
  Visibility,
  Language,
  PermIdentity,
} from '@material-ui/icons';

import { UNKNOWN } from '../../constants';

import { FooterInfo } from './FooterInfo';

import styles from './Details.module.css';

/**
 * Details page, containing selected repository information
 */
export const Details = ({ selectedRepo, goBack }) => {
  if (!selectedRepo) {
    return null;
  }

  const footerItems = [
    {
      title: 'Number of Times Starred',
      className: styles.star,
      icon: Star,
      value: selectedRepo.stargazers_count ?? UNKNOWN,
    },
    {
      title: 'Watchers',
      icon: Visibility,
      value: selectedRepo.watchers_count ?? UNKNOWN,
    },
    {
      title: 'Main Language',
      icon: Language,
      value: selectedRepo.language || UNKNOWN,
    },
    {
      title: 'License',
      icon: PermIdentity,
      value: selectedRepo.license?.name || UNKNOWN,
    },
  ];

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
            {/* mapping here to avoid prop drilling selectedRepo */}
            {footerItems.map((item, i) => (
              <FooterInfo key={`footer-item-${i + 1}`} {...item} />
            ))}
          </div>
        </Card>
      </Container>
    </div>
  );
};

Details.propTypes = {
  selectedRepo: PropTypes.object,
  goBack: PropTypes.func.isRequired,
};
