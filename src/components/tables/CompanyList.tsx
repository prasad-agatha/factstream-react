import React, {FC} from 'react';
// clsx
import clsx from 'clsx';
// loadash
import _ from 'lodash';
// Components
import {AddFilingModal} from 'src/components/modals';
// next link
import {Link} from 'react-router-dom';
// material ui
import {
  withStyles,
  createStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Typography,
  IconButton,
  Collapse,
  Box,
  Menu,
  MenuItem,
  Divider,
  Button,
} from '@material-ui/core';
import {
  MoreHoriz,
  Edit,
  Visibility,
  AddCircle,
  RemoveCircle,
  ArrowForward,
  DateRange,
  ArrowDropUp,
} from '@material-ui/icons';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (a: {[key in Key]: number | string}, b: {[key in Key]: number | string}) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const StyledTableCell = withStyles(() =>
  createStyles({
    root: {
      backgroundColor: '#ADCDF0',
      color: '#000',
      fontWeight: 500,
      border: '0.5px solid #ADCDF0',
      borderBottomColor: '#ADCDF0',
    },
  })
)(TableCell);
interface ITableDataProps {
  handleFilingModel: (data: any) => any;
  row: any;
  key: any;
}
function TableData(props: ITableDataProps) {
  const {row, handleFilingModel} = props;
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [process, setProcess] = React.useState('Process');

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleProcess = () => {
    setProcess('In Process');
  };

  return (
    <React.Fragment>
      <TableRow className={clsx({tablebodyCell: open})}>
        <TableCell size="small" component="th" scope="row">
          {row.companyid}
        </TableCell>
        <TableCell align="left">
          <Box display="flex">
            <span>
              <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                {open ? (
                  <RemoveCircle fontSize="small" />
                ) : (
                  <AddCircle style={{color: '#89AFF0'}} fontSize="small" />
                )}
              </IconButton>
            </span>
            &nbsp;
            <span style={{fontSize: '12px', display: 'flex', alignItems: 'center'}}>
              <Link
                to={`/company/${row.companyid}/timeseriesdata/`}
                style={{textDecoration: 'none', color: '#000', fontWeight: 'normal'}}
              >
                <Typography className="filing_text">{row.name}</Typography>
              </Link>
            </span>
          </Box>
        </TableCell>
        <TableCell align="center">{row.documentid.length}</TableCell>
        <TableCell>{row.last_reported_period}</TableCell>
        <TableCell>{row.last_file_processing_date}</TableCell>
        <TableCell align="right">
          <div aria-controls="simple-menu" aria-haspopup="true" onClick={handleMenu}>
            <IconButton>
              <MoreHoriz color="primary" />
            </IconButton>
          </div>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem className="menuItem" onClick={() => handleFilingModel(row)}>
              <AddCircle fontSize="small" />
              &nbsp;&nbsp; Add Filing
            </MenuItem>
            <Divider />
            <MenuItem className="menuItem">
              <Edit fontSize="small" />
              &nbsp;&nbsp; Edit Company
            </MenuItem>
            <MenuItem className="menuItem">
              <Visibility fontSize="small" />
              &nbsp;&nbsp;Hide Company
            </MenuItem>
          </Menu>
        </TableCell>
      </TableRow>
      <TableRow className={clsx({tablebodyCell: open})}>
        <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="medium" className="tableContainer">
                <TableHead>
                  <TableRow style={{border: '0.5px solid #ADCDF0'}}>
                    <TableCell style={{borderBottomColor: '#ADCDF0'}}>
                      Sector: {row.sectorid}
                    </TableCell>
                    <TableCell style={{borderBottomColor: '#ADCDF0'}}>ISIN:{row.isin}</TableCell>
                    <TableCell style={{borderBottomColor: '#ADCDF0'}}>
                      Currency: {row.currency.currencyname}
                    </TableCell>
                    <TableCell style={{borderBottomColor: '#ADCDF0'}}>
                      Reference ID: {row.reference_id}
                    </TableCell>
                    <TableCell style={{borderBottomColor: '#ADCDF0'}} align="right" colSpan={3}>
                      Country:{row.countryid}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Document Id</TableCell>
                    <TableCell>Name of Filing</TableCell>
                    <TableCell>Period Name</TableCell>
                    {/* <TableCell>Filing Type</TableCell> */}
                    <TableCell align="right">Reported Date</TableCell>
                    <TableCell align="right" colSpan={3}>
                      Status
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.document.map((detailRow: any, index: any) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {/* {index + 1} */}
                        {detailRow.documentid}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Link
                          className="tooltip-content"
                          target="_blank"
                          to={`/company/${row.companyid}/normaliseddata/${detailRow.documentid}/`}
                          style={{textDecoration: 'none', color: '#000', fontWeight: 'normal'}}
                        >
                          <Typography className="filing_text">
                            {detailRow.filedisplayname}
                          </Typography>
                          <span className="tooltiptext">{detailRow.filedisplayname}</span>
                        </Link>
                      </TableCell>
                      <TableCell>{detailRow.period.periodname}</TableCell>
                      <TableCell align="right">{detailRow.filereportedtime}</TableCell>
                      <TableCell align="right" colSpan={3}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleProcess}
                          style={{fontSize: '11px', textTransform: 'capitalize'}}
                        >
                          {process}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {row.documentid.length == 0 ? (
                    <TableRow>
                      <TableCell style={{borderBottomColor: '#ADCDF0'}} colSpan={7}>
                        <Typography align="center">Oops! no filing added</Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    <TableRow>
                      <TableCell
                        style={{borderBottomColor: '#ADCDF0'}}
                        component="th"
                        scope="row"
                        colSpan={7}
                      >
                        <Typography align="right" className="viewAll">
                          <Link
                            to={'company/' + row.companyid}
                            style={{textDecoration: 'none', color: '#89AFF0'}}
                          >
                            View all&nbsp;&nbsp;
                            <ArrowForward className="arrowIcon" />
                          </Link>
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

interface Data {
  sr_no: number;
  name: string;
  number_of_filing_processed: number;
  last_reported_period: string;
  last_file_processing_date: string;
  action: string;
  document: any;
  documentid: any;
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: any;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  {id: 'sr_no', numeric: false, disablePadding: false, label: 'Id'},
  {id: 'name', numeric: false, disablePadding: false, label: 'Company Name'},
  {
    id: 'number_of_filing_processed',
    numeric: true,
    disablePadding: false,
    label: 'Number of Filing Processed',
  },
  {
    id: 'last_reported_period',
    numeric: false,
    disablePadding: false,
    label: 'Last Reported Period	',
  },
  {
    id: 'last_file_processing_date',
    numeric: false,
    disablePadding: false,
    label: (
      <>
        Last file Processing Date <DateRange />
      </>
    ),
  },
  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: 'Actions',
  },
];

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  order: Order;
  orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {order, orderBy, onRequestSort} = props;
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell, index) => (
          <StyledTableCell
            key={index}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              IconComponent={ArrowDropUp}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className="visuallyHidden">
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
interface ICompanyListProps {
  data: any;
  handlePageNumber: (data: any) => any;
  pageNumber: number;
}

const CompanyList: FC<ICompanyListProps> = (props: ICompanyListProps) => {
  const {data, handlePageNumber, pageNumber} = props;
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('sr_no');
  const [page, setPage] = React.useState(0);
  const [dataPerPage, setdataPerPage] = React.useState(20);
  const [openFiling, setOpenFiling] = React.useState(false);
  const [companyData, setCompanyData] = React.useState({});

  const handleFilingModel = (data: any) => {
    setCompanyData(data);
    setOpenFiling(!openFiling);
  };

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    handlePageNumber(newPage);
    // setPage(newPage);
  };

  const handleCloseModel = () => {
    setOpenFiling(!openFiling);
  };
  const handleChangedataPerPage = (event: any) => {
    setdataPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  if (!data) {
    return <>loading..</>;
  }
  const emptyRows = dataPerPage - Math.min(dataPerPage, data.length - page * dataPerPage);

  return (
    <>
      <TableContainer component={Paper} className="tableContainer-dashboard">
        <Table size="small" aria-label="collapsible table">
          <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
          <TableBody className="mainpagetablebody">
            {data.results.length == 0 ? (
              <>
                {' '}
                <TableRow>
                  <TableCell style={{borderBottomColor: 'transparent'}} colSpan={6}>
                    <Typography align="center">Oops! no Record added</Typography>
                  </TableCell>
                </TableRow>
              </>
            ) : (
              ''
            )}
            {stableSort(data.results, getComparator(order, orderBy)).map((row, index) => {
              const documentList = _.orderBy(
                row.documentid,
                (item) => {
                  return new Date(item.filereportedtime);
                },
                ['desc']
              );
              row.document = documentList.splice(0, 5);

              return (
                <>
                  <TableData key={index} row={row} handleFilingModel={handleFilingModel} />
                </>
              );
            })}
            {emptyRows > 0 && (
              <TableRow style={{height: 33 * emptyRows}}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[20]}
          component="div"
          count={data.info.count}
          rowsPerPage={dataPerPage}
          page={pageNumber - 1}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangedataPerPage}
        />
      </TableContainer>
      <AddFilingModal
        openModal={openFiling}
        companyDetail={companyData}
        handleCloseModel={handleCloseModel}
      />
    </>
  );
};
export default CompanyList;
