import React from 'react';
import PropTypes from 'prop-types';
import { Button, TextField, Typography, Card } from '@material-ui/core';
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
  sort,
  setSort,
}) => {
  const onSubmit = (e) => {
    e.preventDefault();
    if (searchVal) {
      setSort(initialSortState);
      onSearch();
    }
  };

  const id = 'search';

  return (
    <div id={id}>
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
      {!results.length && !resultsLoading && (
        <Card className={styles.textCard}>
          <Typography className={styles.noResultsText}>
            If your search returns any results, it will be displayed here.
          </Typography>
        </Card>
      )}
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
        onSearch={onSearch}
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
  sort: PropTypes.object.isRequired,
  setSort: PropTypes.func.isRequired,
};
