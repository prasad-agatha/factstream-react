import React, {FC} from 'react';
// clsx
import clsx from 'clsx';
// material UI
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
  Dialog,
  DialogContent,
  Collapse,
  Box,
  Grid,
  Select,
  Menu,
  MenuItem,
  Checkbox,
  Divider,
  FormControl,
  Tab,
  Tabs,
  DialogTitle,
  Button,
} from '@material-ui/core';
import {CheckboxProps} from '@material-ui/core/Checkbox';
import {MenuProps} from '@material-ui/core/Menu';
import {
  MoreHoriz,
  // Edit,
  KeyboardArrowDown,
  KeyboardArrowRight,
  // Delete,
  Close,
  ArrowForward,
  ArrowBack,
} from '@material-ui/icons';
import {ChangeReportedCurrency, CurrencyConversionForm} from 'src/components/forms';
// import {useRequest} from 'lib/hooks';
const useRowStyles = makeStyles(() =>
  createStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
    icon: {
      borderRadius: 3,
      width: 16,
      height: 16,
      border: '1px solid #ADCDF0',
      backgroundColor: '#F4F9FE',
      backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
      '$root.Mui-focusVisible &': {
        outline: '2px auto rgba(19,124,189,.6)',
        outlineOffset: 2,
      },
      'input:hover ~ &': {
        backgroundColor: '#ebf1f5',
      },
      'input:disabled ~ &': {
        boxShadow: 'none',
        background: 'rgba(206,217,224,.5)',
      },
    },
    checkedIcon: {
      backgroundColor: '#0A376C',
      backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
      '&:before': {
        display: 'block',
        width: 16,
        height: 16,
        backgroundImage:
          "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
          " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
          "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
        content: '""',
      },
      'input:hover ~ &': {
        backgroundColor: '#106ba3',
      },
    },
  })
);

// function createData(sheet_name: string) {
//   return {
//     sheet_name,
//     name,
//     details: [],
//   };
// }
function StyledCheckbox(props: CheckboxProps) {
  const classes = useRowStyles();

  return (
    <Checkbox
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      inputProps={{'aria-label': 'decorative checkbox'}}
      {...props}
    />
  );
}
const StyledTableCell = withStyles(() =>
  createStyles({
    root: {
      backgroundColor: '#ADCDF0',
      color: '#000',
      borderBottom: '1px solid #ADCDF0',
    },
  })
)(TableCell);

const StyledMenu = withStyles({
  paper: {
    border: '0',
    background: 'transparent',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  list: {
    '&>list': {
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

interface ITableDataProps {
  handleEdit: () => void;
  row: any;
  key: any;
}
function TableData(props: ITableDataProps) {
  const {row} = props;
  const [open, setOpen] = React.useState(false);
  // const [openChildren, setOpenChildren] = React.useState(false);
  // const [anchorEl, setAnchorEl] = React.useState(null);
  const [selected, setSelected] = React.useState<any[]>([]);
  const [editCurrencyopen, setEditCurrencyopen] = React.useState(false);
  const [showEditCurrency, setShowEditCurrency] = React.useState(false);
  const [showCurrencyConversion, setShowCurrencyConversion] = React.useState(false);

  const classes = useRowStyles();
  const handleCurrencyOpen = () => {
    setEditCurrencyopen(!editCurrencyopen);
  };

  const handleChildrow = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: any[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  // const handleMenu = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  const handleReportCurrency = () => {
    setShowEditCurrency(true);
  };
  const handleCurrencyConversion = () => {
    setShowCurrencyConversion(true);
  };
  const handleBack = () => {
    setShowEditCurrency(false);
    setShowCurrencyConversion(false);
  };
  const isSelected = (id: number) => selected.indexOf(id) !== -1;
  // console.log(row.details);
  // const tab_cell = row.details.map()
  // const tab_cell = row.details.values.map((item, index) => {
  //   return (
  //     <TableCell className={classes.tableBorder} style={{paddingLeft: '34px'}}>
  //       {item.value}
  //     </TableCell>
  //   );
  // });

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell component="th" scope="row">
          <Typography className="tableHeading">
            <StyledCheckbox style={{padding: 0}} />
            <Box display="flex">
              <Typography>
                <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                  {open ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
                </IconButton>
              </Typography>
              <Typography>{row.name}</Typography>
            </Box>
          </Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="collapseTablecell" colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>
              <Table aria-label="purchases" size="small">
                <TableBody>
                  {row.details.map((detail: any, index: any) => {
                    const isItemSelected = isSelected(detail.id);
                    return (
                      <>
                        <TableRow key={index}>
                          <TableCell className="tableHeadCollaspse">
                            <StyledCheckbox
                              style={{padding: 0}}
                              checked={isItemSelected}
                              onClick={(event) => handleChildrow(event, detail.id)}
                            />{' '}
                            &nbsp;
                            {detail.text}
                          </TableCell>
                          {detail.values.map((item: any, index: any) => {
                            return (
                              <TableCell className="tableBorder" key={index}>
                                {item.value}
                              </TableCell>
                            );
                          })}
                          <TableCell align="right" className="tableBorder">
                            <IconButton>
                              <MoreHoriz color="primary" fontSize="small" />
                            </IconButton>
                          </TableCell>

                          {/* {tab_cell} */}
                        </TableRow>
                      </>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      {/* Edit currency Popup */}
      <Dialog
        className="dialog-form pb-3"
        open={editCurrencyopen}
        onClose={handleCurrencyOpen}
        aria-labelledby="form-dialog-title"
      >
        {!showEditCurrency && !showCurrencyConversion ? (
          <>
            <DialogTitle id="form-dialog-title" className="popupTitle">
              <Typography variant="h6">Edit Currency</Typography>
              <IconButton aria-label="close" className="closeButton" onClick={handleCurrencyOpen}>
                <Close style={{color: 'white'}} />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <div className="mt-2">
                <Box py={2} component="div" className="boxedDiv" onClick={handleReportCurrency}>
                  <Typography>
                    Change Report Currency for the row <ArrowForward className="custom_icon" />{' '}
                  </Typography>
                </Box>
                <Box py={3} className="boxedDiv" onClick={handleCurrencyConversion}>
                  <Typography>
                    Apply Currency Conversion <ArrowForward className="custom_icon" />{' '}
                  </Typography>
                </Box>
              </div>
            </DialogContent>
          </>
        ) : showEditCurrency ? (
          <>
            <DialogTitle id="form-dialog-title" className="popupTitle">
              <IconButton aria-label="close" className="arrowButton" onClick={handleBack}>
                <ArrowBack />
              </IconButton>
              <Typography variant="h6">Change Reported Currency</Typography>
              <IconButton aria-label="close" className="closeButton" onClick={handleCurrencyOpen}>
                <Close style={{color: 'white'}} />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <ChangeReportedCurrency />
            </DialogContent>
          </>
        ) : (
          <>
            <DialogTitle id="form-dialog-title" className="popupTitle">
              <IconButton aria-label="close" className="arrowButton" onClick={handleBack}>
                <ArrowBack />
              </IconButton>
              <Typography variant="h6">Switch Currency for entire row</Typography>
              <IconButton aria-label="close" className="closeButton" onClick={handleCurrencyOpen}>
                <Close style={{color: 'white'}} />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <CurrencyConversionForm />
            </DialogContent>
          </>
        )}
      </Dialog>
    </React.Fragment>
  );
}

interface ICompanyFinancialsProps {
  data: any;
}

const CompanyDetails: FC<ICompanyFinancialsProps> = (props: ICompanyFinancialsProps) => {
  const data = props.data.map((item: any) => {
    return {
      name: item.text,
      details: item.dataItems.map((item: any) => {
        return item;
      }),
      columns: item.columns,
    };
  });
  // console.log(data);
  const ButtonTab = withStyles(() =>
    createStyles({
      root: {
        minWidth: 72,
        minHeight: '30px',
        fontSize: '10px',
        color: '#0A376C',
        backgroundColor: '#ffffff',
        border: 0,
        '&:hover': {
          backgroundColor: '#76A9E2',
          color: '#fff',
          opacity: 1,
        },
        '&.Mui-selected': {
          backgroundColor: '#76A9E2',
          color: '#ffffff',
          borderBottom: '0',
        },
      },
    })
  )(Tab);

  const headCells = data[0].columns;
  const [currency, setCurrency] = React.useState('rupees');
  const [dataType, setDataType] = React.useState(0);
  const [dateType, setDateType] = React.useState(1);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [showCommit, setShowCommit] = React.useState(false);
  // const handleMenu = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCurrency = (event: React.ChangeEvent<{value: unknown}>) => {
    setCurrency(event.target.value as string);
  };

  const handleDataType = (event: any, newValue: number) => {
    setDataType(newValue);
  };
  const handleDateType = (event: any, newValue: number) => {
    setDateType(newValue);
  };
  const handleEdit = () => {
    setShowCommit(!showCommit);
  };
  const handleCommit = () => {
    setOpenEdit(!openEdit);
  };

  return (
    <>
      <Grid>
        <Box display="flex" justifyContent="center">
          <Box display="flex" justifyContent="center" alignItems="center">
            <span className="value-text">Values in table are in</span>
            <FormControl variant="outlined" className="margin custom_formControl">
              <Select
                className="selectInput"
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                value={currency}
                onChange={handleCurrency}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="rupees">Rupees</MenuItem>
                <MenuItem value="dollar">Dollar</MenuItem>
                <MenuItem value="euro">Euro</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="outlined" className="margin custom_formControl">
              <Select
                className="selectInput"
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                value="lakhs"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="lakhs">Lakhs</MenuItem>
                <MenuItem value="thousands">Thousands</MenuItem>
                <MenuItem value="crores">Crore</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {showCommit ? (
            <Box ml="auto">
              <Button variant="contained" className="margin primary-btn" onClick={handleCommit}>
                Commit
              </Button>
            </Box>
          ) : (
            <>
              <Box ml="auto" mr={2}>
                <Tabs
                  value={dataType}
                  TabIndicatorProps={{style: {background: 'transparent'}}}
                  onChange={handleDataType}
                  style={{minHeight: '30px', border: '1px solid #76A9E2', borderRadius: '4px'}}
                >
                  <ButtonTab label="Standalone" />
                  <ButtonTab label="Consolidated" />
                </Tabs>
              </Box>
              <Box>
                <Tabs
                  value={dateType}
                  TabIndicatorProps={{style: {background: 'transparent'}}}
                  onChange={handleDateType}
                  style={{minHeight: '30px', border: '1px solid #76A9E2', borderRadius: '4px'}}
                >
                  <ButtonTab label="Annual" />
                  <ButtonTab label="Quarterly" />
                </Tabs>
              </Box>
            </>
          )}
        </Box>
      </Grid>
      <TableContainer component={Paper} className="tableContainer">
        <Table size="small" aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <StyledTableCell style={{width: '380px'}} />
              {headCells.map((headCell: any) => (
                <StyledTableCell key={headCell.id}>
                  <StyledCheckbox />
                  {headCell.text}
                  {/* {headCell.label == 'Q2-2020' ? (
                    <IconButton onClick={handleMenu}>
                      <KeyboardArrowDown style={{position: 'absolute'}} />
                    </IconButton>
                  ) : (
                    ''
                  )} */}
                </StyledTableCell>
              ))}
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: any, index: any) => (
              <TableData key={index} row={row} handleEdit={handleEdit} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <StyledMenu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <FormControl variant="outlined" className="custom_formControl">
            <Select
              className="custom_selectInput"
              labelId="demo-customized-select-label"
              id="demo-customized-select"
              value=""
              displayEmpty
            >
              <MenuItem value="">2019</MenuItem>
              <MenuItem value="rupees">2018</MenuItem>
              <MenuItem value="dollar">2017</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" className="custom_formControl">
            <Select
              className="custom_selectInput"
              labelId="demo-customized-select-label"
              id="demo-customized-select"
              value=""
              displayEmpty
            >
              <MenuItem value="">Q2</MenuItem>
              <MenuItem value="q1">Q1</MenuItem>
              <MenuItem value="q4">Q4</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" className="custom_formControl">
            <Select
              className="custom_selectInput"
              labelId="demo-customized-select-label"
              id="demo-customized-select"
              value=""
              displayEmpty
            >
              <MenuItem value="">state</MenuItem>
              <MenuItem value="rupees">state</MenuItem>
              <MenuItem value="dollar">state</MenuItem>
            </Select>
          </FormControl>
        </MenuItem>
      </StyledMenu>
      {/* Edit row popup */}
      <Dialog
        className="dialog-form pb-3"
        open={openEdit}
        onClose={handleCommit}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" className="popupTitle">
          <Typography variant="h6">Confirmation</Typography>
          <IconButton aria-label="close" className="closeButton" onClick={handleCommit}>
            <Close style={{color: 'white'}} />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <div className="mt-2">
            <Box py={2} component="div">
              <Typography>
                <b>Are you sure you want to save changes?</b>
              </Typography>
              <Typography>If you don&apos;t save,your changes will be lost.</Typography>
            </Box>
            <Divider />
            <Box>
              <Typography align="right">
                <Button variant="contained" className="margin secondary-btn" onClick={handleCommit}>
                  Cancel
                </Button>
                <Button variant="contained" className="primary-btn">
                  Save Changes{' '}
                </Button>
              </Typography>
            </Box>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default CompanyDetails;
