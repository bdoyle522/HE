import PropTypes from 'prop-types';
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  CircularProgress,
  Card,
} from '@material-ui/core';

import styles from './Table.module.css';
import {
  ASCENDING,
  DESCENDING,
  columns,
  OWNER,
  STARS,
  DESCRIPTION,
} from '../../constants';

export const Table = ({
  id,
  data,
  onSelectRow,
  loading,
  onSearch,
  sort,
  setSort,
}) => {
  if (!data.length && !loading) {
    return null;
  }

  const { sortKey, sortOrder } = sort;

  const updateSort = (key) => {
    // github only sorts on stars, and since we aren't paginating,
    // we'll limit the sorting accordingly
    if (key !== STARS) return;
    const newSortOrder = sortOrder === ASCENDING ? DESCENDING : ASCENDING;
    // search key is stars instead of stargazers_count
    onSearch('stars', newSortOrder);
    setSort({ sortKey: key, sortOrder: newSortOrder });
  };

  const tableHeaderCells = columns.map((column) => {
    const { label: key, id } = column;
    return (
      <TableCell
        id={key}
        key={key}
        aria-sort={key === sortKey ? sortOrder : 'none'}
        onClick={() => updateSort(id)}
        width={id === DESCRIPTION ? '40%' : '15%'}
      >
        <TableSortLabel active={id === sortKey} direction={sortOrder}>
          {key}
        </TableSortLabel>
      </TableCell>
    );
  });

  const tableRows = data.map((data, i) => (
    <TableRow
      key={data.id}
      className={styles.row}
      onClick={() => onSelectRow(i)}
    >
      {columns.map((col) => {
        const { id } = col;
        return (
          <TableCell key={id} width={id === DESCRIPTION ? '40%' : '15%'}>
            {id === OWNER ? data.owner.login ?? '' : data[id]}
          </TableCell>
        );
      })}
    </TableRow>
  ));

  return (
    <Card className={styles.cardWrapper}>
      <TableContainer className={styles.table} id={id}>
        <MuiTable stickyHeader>
          <TableHead>
            <TableRow>{tableHeaderCells}</TableRow>
          </TableHead>
          <TableBody>
            {!loading ? (
              <>{tableRows}</>
            ) : (
              <TableRow className={styles.spinner}>
                <td>
                  <CircularProgress />
                </td>
              </TableRow>
            )}
          </TableBody>
        </MuiTable>
      </TableContainer>
    </Card>
  );
};

Table.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelectRow: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  onSearch: PropTypes.func.isRequired,
  sort: PropTypes.object.isRequired,
  setSort: PropTypes.func.isRequired,
};
