import React, {FC} from 'react';
// material ui
import {
  withStyles,
  makeStyles,
  createStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core';
import {MoreHoriz, Edit, AddCircle} from '@material-ui/icons';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: '1px solid #DBEBFC',
    },
  },
  tablehead: {
    backgroundColor: '#ADCDF0',
    color: '#000',
  },
  tablebody: {
    backgroundColor: '#F6FAFA',
    color: '#000',
  },
  menuItem: {fontSize: '14px'},
});

function createData(sr_no: number, template_name: string, Date_of_Creation: string) {
  return {
    template_name,
    Date_of_Creation,

    actions: (
      <IconButton>
        <MoreHoriz color="primary" />
      </IconButton>
    ),
    details: [
      {
        id: '01',
        name_of_filing: 'Q2-2019',
        process_by: 'Shubham khairner',
        date_of_processing: '15-06-2020',
        status: 'Completed',
      },
      {
        id: '02',
        name_of_filing: 'Q2-2019',
        process_by: 'Shubham khairner',
        date_of_processing: '15-06-2020',
        status: 'Completed',
      },
    ],
  };
}
const StyledTableCell = withStyles(() =>
  createStyles({
    root: {
      backgroundColor: '#ADCDF0',
      color: '#000',
      fontWeight: 500,
    },
  })
)(TableCell);

function TableData(props: {row: ReturnType<typeof createData>}) {
  const {row} = props;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useRowStyles();

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell align="left">
          <Typography>
            <span className="main-content-text-normal">{row.template_name}</span>
          </Typography>
        </TableCell>
        <TableCell>{row.Date_of_Creation}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleMenu}>
            <MoreHoriz color="primary" fontSize="small" />
          </IconButton>
        </TableCell>
      </TableRow>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuItem className={classes.menuItem}>
          <Edit fontSize="small" />
          &nbsp;&nbsp; Edit
        </MenuItem>
        <MenuItem className={classes.menuItem}>
          <AddCircle fontSize="small" />
          &nbsp;&nbsp; Delete
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

const data = [
  createData(1, 'Bank A Template', '15-08-2020'),
  createData(2, 'Bank B Template', '18-11-2019'),
  createData(3, 'Bank C Template', '28-03-2018'),
];

const TemplatesTable: FC = () => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name of Template</StyledTableCell>
              <StyledTableCell>Date of Creation</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableData key={index} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default TemplatesTable;
