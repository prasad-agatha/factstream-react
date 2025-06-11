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
  TextField,
  TextareaAutosize,
  Popover,
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import MenuIcon from '@material-ui/icons/Menu';
import CreateIcon from '@material-ui/icons/Create';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import {HirarchyModal} from 'src/components/modals';

const useRowStyles = makeStyles(() =>
  createStyles({
    root: {
      '& > *': {
        borderBottom: '1px solid #DBEBFC',
      },
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
      backgroundColor: '#F6FAFA',
      color: '#000',
    },
    menuItem: {fontSize: '14px'},
  })
);

function createData(sr_no: number, company_name: string) {
  return {
    company_name,

    formula: <></>,
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

function TableData(props: {row: ReturnType<typeof createData>; edit: boolean}) {
  const {row, edit} = props;
  const [input, showInput] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handlePopOverClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopOverClose = () => {
    setAnchorEl(null);
  };

  const useStyles = makeStyles(() =>
    createStyles({
      typography: {
        padding: '0px 8px',
      },
    })
  );

  const openPopOver = Boolean(anchorEl);
  const id = openPopOver ? 'simple-popover' : undefined;

  const classes = useRowStyles();
  const popOverClasses = useStyles();

  const [openModal, setOpenModal] = React.useState(false);

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell align="left">
          <Typography>
            <span>
              {' '}
              {!edit ? (
                <>
                  <MenuIcon style={{fontSize: '12px', fontWeight: 'bold'}} />
                </>
              ) : (
                <>
                  <RemoveCircle style={{fontSize: '12px', fontWeight: 'bold'}} />
                </>
              )}
              &nbsp;
              <span className="client-line-items main-content-text-normal" contentEditable={false}>
                {row.company_name}
              </span>
            </span>
          </Typography>
        </TableCell>

        <TableCell align="right">
          <div aria-controls="simple-menu" aria-haspopup="true">
            {input ? (
              <>
                {' '}
                <>
                  <TextField
                    className="input-fields"
                    onClick={handlePopOverClick}
                    size="small"
                    id="outlined-password-input"
                    type="text"
                    variant="outlined"
                  />
                  <Popover
                    id={id}
                    style={{padding: '10px'}}
                    open={openPopOver}
                    anchorEl={anchorEl}
                    onClose={handlePopOverClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                  >
                    <p className={`${popOverClasses.typography} main-content-text-normal`}>
                      Material cost last year
                    </p>
                    <p className={`${popOverClasses.typography} main-content-text-normal`}>
                      Employee cost last year
                    </p>
                    <p className={`${popOverClasses.typography} main-content-text-normal`}>
                      Days Inventory Outstanding{' '}
                    </p>
                    <p
                      onClick={handleClickOpenModal}
                      style={{
                        color: '#4A90E2',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                      }}
                      className={`${popOverClasses.typography} main-content-text-normal`}
                    >
                      See Full hirarchy
                    </p>
                    <HirarchyModal openModal={openModal} handleCloseModal={handleCloseModal} />
                  </Popover>
                </>
                <p
                  className="btn-icon"
                  style={{fontSize: '10px', margin: '1px', color: '#4A90E2', fontWeight: 'bold'}}
                  onClick={() => showInput(false)}
                >
                  Add Formula
                </p>
              </>
            ) : (
              <>
                <TextareaAutosize
                  aria-describedby={id}
                  onClick={handlePopOverClick}
                  aria-label="minimum height"
                  rowsMin={3}
                />
                <Popover
                  id={id}
                  style={{padding: '10px'}}
                  open={openPopOver}
                  anchorEl={anchorEl}
                  onClose={handlePopOverClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                >
                  <p className={`${popOverClasses.typography} main-content-text-normal`}>
                    Total Revenue
                  </p>
                  <p className={`${popOverClasses.typography} main-content-text-normal`}>
                    Total Assets
                  </p>
                  <p className={`${popOverClasses.typography} main-content-text-normal`}>
                    Total Expense
                  </p>
                  <p className={`${popOverClasses.typography} main-content-text-normal`}>
                    Return on Assets
                  </p>
                </Popover>
                <p
                  className="btn-icon"
                  style={{fontSize: '10px', margin: '1px', color: '#4A90E2', fontWeight: 'bold'}}
                  onClick={() => showInput(true)}
                >
                  Close Formula box
                </p>
              </>
            )}
          </div>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const data = [
  createData(1, 'Net Income'),
  createData(2, 'Cost of Goods Sold'),
  createData(3, 'Revenue Growth'),
];

const CreateTemplate: FC = () => {
  const [edit, setEdit] = React.useState(false);
  const classes = useRowStyles();

  return (
    <>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell>
                Client Line Items &nbsp;
                <CreateIcon
                  className="btn-icon"
                  onClick={() => setEdit(!edit)}
                  style={{fontSize: '14px'}}
                />
              </StyledTableCell>

              <StyledTableCell align="right">Almug Taxonomy/Formula</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableData edit={edit} key={index} row={row} />
            ))}
            <TableRow className={classes.root}>
              <TableCell style={{padding: '20px'}}>
                <Typography>
                  <span>
                    <AddCircleIcon
                      style={{fontSize: '12px', fontWeight: 'bold', color: '#4A90E2'}}
                    />
                  </span>
                  &nbsp;
                  <span style={{fontSize: '14px', fontWeight: 'bold', color: '#4A90E2'}}>
                    Add more rows
                  </span>
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default CreateTemplate;
