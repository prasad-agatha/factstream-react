import React, {FC} from 'react';
// clsx
import clsx from 'clsx';
// material ui
import {
  Box,
  Theme,
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
  Grid,
  Button,
  Drawer,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import {Close, Info} from '@material-ui/icons';

const useRowStyles = makeStyles(() =>
  createStyles({
    root: {
      '& > *': {
        borderBottom: '0.5px solid #DBEBFC',
      },
    },
    drawer: {
      height: '100%',
      width: 320,
      border: '1px solid #4A90E2',
      right: 0,
      position: 'absolute',
      background: '#ffffff',
    },
    margin: {
      margin: '8px',
    },
    tableContainer: {
      boxShadow: 'none',
      border: '1px solid #DBEBFC',
      borderRadius: '4px',
    },
    tablehead: {
      backgroundColor: '#ADCDF0',
      color: '#000',
    },
    tablebody: {
      backgroundColor: '#fff',
      color: '#000',
    },
    tableCell: {
      padding: '10px 24px 10px 16px',
      fontWeight: 500,
    },
    tablebodyCell: {
      backgroundColor: '#F4F9FE',
      color: '#000',
    },
    infoIcon: {position: 'absolute', fontSize: '15px'},
    menuItem: {fontSize: '14px'},
    spantext: {position: 'absolute'},
    drawerTitle: {
      margin: 0,
      backgroundColor: '#4A90E2',
      color: '#ffffff',
      padding: '7px 16px',
    },
    closeButton: {
      position: 'absolute',
      right: 4,
      top: 0,
      color: '#9e9e9e',
    },
    tooltip: {
      backgroundColor: '#fff',
      color: 'rgba(0, 0, 0, 0.87)',
      fontSize: 11,
    },
    cancelButton: {
      boxShadow: 'none',
      backgroundColor: '#fff',
      border: '1px solid #999999',
      color: '#999999',
      fontSize: '14px',
      textTransform: 'none',
      padding: '4px 17px',
      fontWeight: 500,
    },
    styledButton: {
      color: '#ffffff',
      border: '1px solid #4a90e2',
      backgroundColor: '#4a90e2',
      boxShadow: 'none',
      padding: '4px 17px',
      fontWeight: 500,
      textTransform: 'none',
      '&:hover': {
        backgroundColor: '#89AFF0',
      },
    },
  })
);

function createData(
  income_statement: string,
  Q4_2020: string,
  Q3_2020: string,
  Q2_2020: string,
  Q1_2020: string
) {
  return {
    income_statement,
    Q4_2020,
    Q3_2020,
    Q2_2020,
    Q1_2020,
  };
}
const StyledTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: 11,
    border: '1px solid #76A9E2',
  },
  arrow: {
    color: '#76A9E2',
  },
}))(Tooltip);
const StyledTableCell = withStyles(() =>
  createStyles({
    root: {
      backgroundColor: '#ADCDF0',
      color: '#000',
      fontWeight: 600,
      border: '1px solid #ADCDF0',
      padding: '10px 24px 10px 16px',
      fontSize: '15px',
    },
  })
)(TableCell);

function TableData(props: {row: ReturnType<typeof createData>; toggleDrawer: () => void}) {
  const {row, toggleDrawer} = props;
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={clsx(classes.root)}>
        <TableCell className={classes.tableCell} component="th" scope="row">
          {row.income_statement}
          {row.income_statement == 'Costs of Good Sold' ||
          row.income_statement == 'Operating Profit' ? (
            <StyledTooltip arrow title="Units solds x sales price">
              <IconButton>
                <Info className={classes.infoIcon} />
              </IconButton>
            </StyledTooltip>
          ) : (
            ''
          )}
        </TableCell>
        <TableCell className={classes.tableCell} onClick={toggleDrawer}>
          {row.Q4_2020}
        </TableCell>
        <TableCell className={classes.tableCell}>{row.Q3_2020}</TableCell>
        <TableCell className={classes.tableCell}>{row.Q2_2020}</TableCell>
        <TableCell className={classes.tableCell}>{row.Q1_2020}</TableCell>
      </TableRow>
    </React.Fragment>
  );
}

interface Data {
  income_statement: string;
  Q4_2020: string;
  Q3_2020: string;
  Q2_2020: string;
  Q1_2020: string;
}

const data = [
  createData('Revenue', '16,70,719', '12,10,666', '12,10,666', '12,10,666'),
  createData('Revenue Growth', '16,70,719', '12,10,666', '12,10,666', '12,10,666'),
  createData('Costs of Good Sold', '16,70,719', '12,10,666', '12,10,666', '12,10,666'),
  createData('Operating Profit', '16,70,719', '12,10,666', '12,10,666', '12,10,666'),
  createData('Revenue', '16,70,719', '12,10,666', '12,10,666', '12,10,666'),
  createData('Revenue Growth', '16,70,719', '12,10,666', '12,10,666', '12,10,666'),
];

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  {id: 'income_statement', numeric: false, disablePadding: true, label: 'Income Statement'},
  {id: 'Q4_2020', numeric: false, disablePadding: false, label: 'Q4-2020'},
  {
    id: 'Q3_2020',
    numeric: false,
    disablePadding: false,
    label: 'Q3-2020',
  },
  {
    id: 'Q2_2020',
    numeric: false,
    disablePadding: false,
    label: 'Q2-2020	',
  },
  {
    id: 'Q1_2020',
    numeric: false,
    disablePadding: false,
    label: 'Q1-2020 ',
  },
];

const StyledDrawer = withStyles({
  root: {
    '&>.MuiBackdrop-root': {
      backgroundColor: 'transparent',
    },
  },
  paper: {
    top: '64px',
    position: 'relative',
    backgroundColor: 'transparent',
  },
})(Drawer);

const IncomeStatement: FC = () => {
  const classes = useRowStyles();
  const [opendrawer, setOpenDrawer] = React.useState(false);
  const toggleDrawer = () => {
    setOpenDrawer(!opendrawer);
  };
  return (
    <>
      <Grid className="pb-2">
        <Typography align="right">
          <Button variant="contained" className={clsx(classes.margin, classes.cancelButton)}>
            Cancel
          </Button>
          &nbsp;&nbsp;
          <Button variant="contained" className={clsx(classes.styledButton)}>
            Publish
          </Button>
        </Typography>
      </Grid>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <StyledTableCell key={headCell.id} align={headCell.numeric ? 'right' : 'left'}>
                  {headCell.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableData toggleDrawer={toggleDrawer} key={index} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <StyledDrawer anchor="right" open={opendrawer} onClose={toggleDrawer}>
        <div className={classes.drawer}>
          <Box className={classes.drawerTitle}>
            <Typography variant="h6">Almug Editor</Typography>
            <IconButton aria-label="close" className={classes.closeButton} onClick={toggleDrawer}>
              <Close style={{color: 'white'}} fontSize="small" />
            </IconButton>
          </Box>
          <div style={{padding: '13px'}}>
            <Box component="div" className="boxedDiv">
              <p>
                <b>Formula</b>
              </p>
              <p>Revenue = Revenue</p>
            </Box>
            <Box component="div" className="boxedDiv">
              <p>
                <b>Formula Breakdown</b>
              </p>
              <p>No formula for breakdown</p>
            </Box>
          </div>
        </div>
      </StyledDrawer>
    </>
  );
};
export default IncomeStatement;
