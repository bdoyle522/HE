import PropTypes from 'prop-types';
import { Select, MenuItem, Typography } from '@material-ui/core';

import styles from './Language.module.css';
import { ALL } from '../../constants';

export const LanguageSelector = ({
  id,
  languages,
  selectedLanguage,
  setSelectedLanguage,
  numResults,
  loading,
}) => {
  if (!numResults || loading) {
    return null;
  }
  return (
    <form className={styles.filterWrapper} id={id}>
      <Typography variant="body1">Filter By Language:</Typography>
      <Select
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
        className={styles.select}
        id={`${id}-select`}
      >
        <MenuItem value={ALL} key={ALL} id={`${id}-select-all`}>
          All
        </MenuItem>
        {languages.map((lang) => (
          <MenuItem value={lang} key={lang} id={`${id}-select-${lang}`}>
            {lang}
          </MenuItem>
        ))}
      </Select>
    </form>
  );
};

LanguageSelector.propTypes = {
  id: PropTypes.string.isRequired,
  languages: PropTypes.arrayOf(PropTypes.string),
  setSelectedLanguage: PropTypes.func.isRequired,
  selectedLanguage: PropTypes.string.isRequired,
  numResults: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
};
