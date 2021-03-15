import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Button, TextField, Typography } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import { Table } from './Table';
import { ASCENDING } from '../../constants';

import { LanguageSelector } from './LanguageSelector';

import styles from './Search.module.css';

const initialSortState = { sortKey: '', sortOrder: ASCENDING };

export const Search = ({
  onSearch,
  searchVal,
  onChange,
  results,
  onSelectRow,
  resultsLoading,
  languages,
  selectedLanguage,
  setSelectedLanguage,
}) => {
  const [sort, setSort] = useState(initialSortState);

  const onSubmit = (e) => {
    e.preventDefault();
    if (searchVal) {
      setSort(initialSortState);
      onSearch();
    }
  };

  const onSortChange = (sort, sortOrder) => {
    onSearch(sort, sortOrder);
  };

  const id = 'search';

  return (
    <div
      className={cn(styles.wrapper, {
        [styles.noResults]: !results.length && !resultsLoading,
      })}
      id={id}
    >
      <form
        onSubmit={onSubmit}
        className={styles.container}
        id={`${id}-inputs`}
      >
        <Typography className={styles.searchEngine} variant="h6">
          GitHub Search Engine
        </Typography>
        <div className={styles.searchInputs}>
          <TextField
            value={searchVal}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search..."
            size="small"
            variant="outlined"
            id={`${id}-text-input`}
          />
          <Button
            id="search-button"
            disabled={!searchVal}
            onClick={onSubmit}
            startIcon={<SearchIcon />}
            // alternative to targeting multiple inner mui classes
            // is using `Button`'s style prop
            style={{
              backgroundColor: 'green',
              color: 'white',
              marginLeft: '10px',
            }}
          >
            Search
          </Button>
        </div>
      </form>
      <LanguageSelector
        languages={languages}
        setSelectedLanguage={setSelectedLanguage}
        selectedLanguage={selectedLanguage}
        loading={resultsLoading}
        numResults={results.length}
        id={`${id}-language`}
      />
      <Table
        data={results}
        onSelectRow={onSelectRow}
        loading={resultsLoading}
        onSearch={onSortChange}
        sort={sort}
        setSort={setSort}
        id={`${id}-table`}
      />
    </div>
  );
};

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
  searchVal: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSelectRow: PropTypes.func.isRequired,
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  resultsLoading: PropTypes.bool.isRequired,
  selectedLanguage: PropTypes.string.isRequired,
  setSelectedLanguage: PropTypes.func.isRequired,
  languages: PropTypes.arrayOf(PropTypes.string).isRequired,
};
