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
import { columns, OWNER, STARS } from '../../../constants';

const Table = ({ id, data, onSelectRow, loading, onSearch, sort, setSort }) => {
  if (!data.length && !loading) {
    return null;
  }

  const { sortKey, sortOrder } = sort;

  const updateSort = (key) => {
    if (key !== STARS) return;
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
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
          <TableCell key={id}>
            {id === OWNER ? data.owner.login ?? '' : data[id]}
          </TableCell>
        );
      })}
    </TableRow>
  ));

  return (
    <>
      {loading ? (
        <div className={styles.spinner}>
          <CircularProgress />
        </div>
      ) : (
        <Card className={styles.cardWrapper}>
          <TableContainer className={styles.table} id={id}>
            <MuiTable stickyHeader>
              <TableHead>{tableHeaderCells}</TableHead>
              <TableBody>{tableRows}</TableBody>
            </MuiTable>
          </TableContainer>
        </Card>
      )}
    </>
  );
};

export default Table;

Table.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelectRow: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  onSearch: PropTypes.func.isRequired,
  sort: PropTypes.object.isRequired,
  setSort: PropTypes.func.isRequired,
};
