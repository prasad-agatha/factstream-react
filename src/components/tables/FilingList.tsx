import React, {FC} from 'react';
//  lodash
import {debounce} from 'lodash';
// next
import {Link} from 'react-router-dom';
// material ui
import {
  withStyles,
  createStyles,
  Box,
  Paper,
  FormControl,
  OutlinedInput,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
} from '@material-ui/core';
import {Search} from '@material-ui/icons';

const StyledTableCell = withStyles(() =>
  createStyles({
    root: {
      backgroundColor: '#ADCDF0',
      color: '#000',
      fontWeight: 500,
      border: '0.5px solid #ADCDF0',
    },
  })
)(TableCell);

const headCells = [
  {id: 'sr_no', numeric: false, disablePadding: false, label: 'Sr No.'},
  {id: 'name_of_filing', numeric: false, disablePadding: false, label: 'Name of Filing'},
  {
    id: 'process_by',
    numeric: false,
    disablePadding: false,
    label: 'Process by',
  },
  {
    id: 'date_of_processing',
    numeric: true,
    disablePadding: false,
    label: 'Date of Processing',
  },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
  },
];

interface ITableDataProps {
  row: any;
  key: any;
  companyid: any;
}
function TableData(props: ITableDataProps) {
  const {row, companyid} = props;

  return (
    <React.Fragment>
      <TableRow>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell align="left">
          <Link
            className="tooltip-content"
            target="_blank"
            to={`/company/${companyid}/normaliseddata/${row.documentid}/`}
            style={{textDecoration: 'none', color: '#000', fontWeight: 'normal'}}
          >
            <Typography className="filing_text">{row.filedisplayname}</Typography>
            <span className="tooltiptext">{row.filedisplayname}</span>
          </Link>
        </TableCell>
        <TableCell>
          {/* <Person fontSize="small" /> &nbsp;
          <span className="spantext">{row.process_by}</span> */}
        </TableCell>
        <TableCell align="right">{/* {row.date_of_processing} */}</TableCell>
        <TableCell align="right">
          {/* {row.status === 'Completed' ? (
            <>{row.status}</>
          ) : (
            <span className="filing-status">{row.status}</span>
          )} */}
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
interface IFilingListProps {
  datalist: any;
}
const FilingList: FC<IFilingListProps> = (props: IFilingListProps) => {
  const {datalist} = props;
  const [page, setPage] = React.useState(0);
  const [dataPerPage, setdataPerPage] = React.useState(20);
  const [inputText, setInputText] = React.useState('');
  const [tableList, setTablelist] = React.useState([]);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  if (!datalist) {
    return <>loading...</>;
  }
  React.useEffect(() => {
    if (datalist && inputText == '') {
      setTablelist(datalist.documentid);
    }
  }, [datalist, inputText]);
  const handleChangedataPerPage = (event: any) => {
    setdataPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const data = tableList.map((item: any, index) => {
    item.id = index + 1;
    return item;
  });
  const updateQuery = () => {
    if (inputText !== '') {
      // console.log(inputText);
      const data = tableList.filter((item) =>
        item.filedisplayname.toLowerCase().includes(inputText)
      );
      setTablelist(data);
    }
  };
  const search = React.useCallback(debounce(updateQuery, 300), [inputText]);

  const handleSearch = (event: any) => {
    setInputText(event.target.value);
  };

  React.useEffect(() => {
    search();
    return search.cancel;
  }, [inputText, search]);

  return (
    <>
      <Box display="flex" className="mb-3">
        <FormControl className="searchtextField" variant="outlined">
          <OutlinedInput
            className="searchInput"
            id="outlined-adornment-search"
            value={inputText}
            startAdornment={
              <InputAdornment position="end">
                <Search className="search-icon" />{' '}
              </InputAdornment>
            }
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              'aria-label': 'search',
            }}
            onChange={handleSearch}
            labelWidth={0}
            placeholder="Search by document name"
          />
        </FormControl>
      </Box>
      <TableContainer component={Paper} className="tableContainer">
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>Sector:{datalist.sectorid}</TableCell>
              <TableCell>ISIN:{datalist.isin}</TableCell>
              <TableCell>Currency:{datalist.currencyid}</TableCell>
              <TableCell align="right">Reference ID:{datalist.referenceid}</TableCell>
              <TableCell align="right">Country:{datalist.country}</TableCell>
            </TableRow>
            <TableRow>
              {headCells.map((headCell) => (
                <StyledTableCell
                  key={headCell.id}
                  align={headCell.numeric ? 'right' : 'left'}
                  padding={headCell.disablePadding ? 'none' : 'default'}
                >
                  {headCell.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * dataPerPage, page * dataPerPage + dataPerPage)
              .map((row: any, index: any) => {
                // row.sr = index + 1;

                return (
                  <>
                    <TableData key={index} row={row} companyid={datalist.companyid} />
                  </>
                );
              })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[20]}
          component="div"
          count={tableList.length}
          rowsPerPage={dataPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangedataPerPage}
        />
      </TableContainer>
    </>
  );
};
export default FilingList;
