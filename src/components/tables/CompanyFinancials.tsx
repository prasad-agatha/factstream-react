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
  DialogTitle,
  Button,
  Switch,
} from '@material-ui/core';
import {CheckboxProps} from '@material-ui/core/Checkbox';
import {MenuProps} from '@material-ui/core/Menu';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
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
import {PdfViewer} from 'src/components/elements';
// import { Resizable, ResizableBox } from 'react-resizable';
import {Resizable} from 're-resizable';
// import {useRequest} from 'lib/hooks';
// import {DocViewer} from 'components/elements';
// import dynamic from 'next/dynamic';
// const PdfViewer = dynamic(() => import('components/elements').then((mod) => mod.DocViewer), {
//   ssr: false,
// });
const useRowStyles = makeStyles(() =>
  createStyles({
    root: {
      '& > *': {
        // borderBottom: '1px solid #ADCDF0',
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
    contentbox: {
      display: 'flex',
      // background:'#fff',
      // height: '100%',
      // width: '100%',
      // overflow: 'auto',
      // position: 'absolute',
      marginBottom: '20px',
      // maxWidth: '1023px',
    },
    contentblock: {
      // display: 'block',
    },
    horizontal: {
      // height: '50% !important',
      // width: '100% !important',
    },
    vertical: {
      height: '100% !important',
      width: '100%',
      float: 'left',
    },
    borderBottom: {
      borderBottom: '1px solid #ccc',
    },
    maxWidth: {
      maxWidth: '60%',
    },
  })
);

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
      fontSize: '13px',
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
interface INestedTableData {
  row: any;
  key: any;
}
function NestedTableData(props: INestedTableData) {
  const {row} = props;
  return (
    <>
      <TableRow>
        {row.map((item: any, index: any) => {
          return (
            <>
              {item.column_sort_number == 0 ? (
                <TableCell className="tableHeadCollaspse" key={index}>
                  <Box display="flex" alignItems="center">
                    <Typography>
                      <StyledCheckbox />
                    </Typography>
                    <Typography className="table-font">{item.value}</Typography>
                  </Box>
                </TableCell>
              ) : (
                <TableCell className="tableBorder" key={index} align="center">
                  <Typography className="table-font">{item.value}</Typography>
                </TableCell>
              )}
            </>
          );
        })}
        <TableCell align="right" className="tableBorder">
          <IconButton>
            <MoreHoriz color="primary" fontSize="small" />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
}

interface ITableDataProps {
  row: any;
  key: any;
}
function TableData(props: ITableDataProps) {
  const {row} = props;
  const [open, setOpen] = React.useState(true);
  // const [openChildren, setOpenChildren] = React.useState(false);
  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const [selected, setSelected] = React.useState<any[]>([]);
  const [editCurrencyopen, setEditCurrencyopen] = React.useState(false);
  const [showEditCurrency, setShowEditCurrency] = React.useState(false);
  const [showCurrencyConversion, setShowCurrencyConversion] = React.useState(false);

  const classes = useRowStyles();
  const handleCurrencyOpen = () => {
    setEditCurrencyopen(!editCurrencyopen);
  };

  // const handleChildrow = (event: React.MouseEvent<unknown>, id: number) => {
  //   const selectedIndex = selected.indexOf(id);
  //   let newSelected: any[] = [];

  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, id);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1)
  //     );
  //   }

  //   setSelected(newSelected);
  // };

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
  // const isSelected = (id: number) => selected.indexOf(id) !== -1;
  const nestedValues = [];
  if (row[0].children.length >= 1) {
    row[0].children.map((item, index) => {
      nestedValues[index] = [];
    });
  }
  // const childArray = row[0].children.map((item, index) => {
  //   nestedValues[index] = [];
  // });

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        {row.map((item, index) => {
          return (
            <>
              <TableCell key={index} component="th" scope="row">
                {item.children.length >= 1 && item.column_sort_number == 0 ? (
                  <>
                    <Box display="flex" alignItems="center">
                      <Typography>
                        <StyledCheckbox />
                      </Typography>
                      <Typography className="table-font">
                        {' '}
                        <IconButton
                          aria-label="expand row"
                          size="small"
                          onClick={() => setOpen(!open)}
                        >
                          {open ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
                        </IconButton>
                        {item.value}
                      </Typography>
                    </Box>
                  </>
                ) : item.column_sort_number == 0 ? (
                  <Box display="flex" alignItems="center">
                    <Typography>
                      <StyledCheckbox />
                    </Typography>
                    <Typography className="table-font">{item.value}</Typography>
                  </Box>
                ) : (
                  <Typography className="table-font" align="center">
                    {item.value}
                  </Typography>
                )}

                {item.children.map((detail: any, index: any) => {
                  nestedValues[index].push(detail);
                })}
              </TableCell>
            </>
          );
        })}
        <TableCell align="right">
          <IconButton>
            <MoreHoriz color="primary" fontSize="small" />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="collapseTablecell" colSpan={row.length + 1}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>
              <Table aria-label="purchases" size="small">
                <TableBody>
                  {nestedValues.map((detail: any, index: any) => {
                    // const isItemSelected = isSelected(detail.id);
                    return (
                      <>
                        <NestedTableData row={detail} key={index} />
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
  metaInfo?: any;
  sourceView?: any;
}

const CompanyFinancials: FC<ICompanyFinancialsProps> = (props: ICompanyFinancialsProps) => {
  const classes = useRowStyles();
  const {data, sourceView, metaInfo} = props;
  // const [sourceView, setSourceView] = React.useState(sourceView);
  const [pdfvalue, setPdfvalue] = React.useState('1');
  const [width, setWidth] = React.useState(100);
  const [height, setHeight] = React.useState(50);
  // const data = props.data.map((item: any) => {
  //   return {
  //     name: item.text,
  //     details: item.dataItems.map((item: any) => {
  //       return item;
  //     }),
  //     columns: item.columns,
  //   };
  // });

  const headCells = data.columns;
  // const [currency, setCurrency] = React.useState(metaData.currency);
  // const [dataType, setDataType] = React.useState(0);
  // const [dateType, setDateType] = React.useState(1);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openEdit, setOpenEdit] = React.useState(false);
  // const [showCommit, setShowCommit] = React.useState(false);
  // const handleMenu = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // const handleCurrency = (event: React.ChangeEvent<{value: unknown}>) => {
  //   setCurrency(event.target.value as string);
  // };

  // const handleDataType = (event: any, newValue: number) => {
  //   setDataType(newValue);
  // };
  // const handleDateType = (event: any, newValue: number) => {
  //   setDateType(newValue);
  // };
  const handleCommit = () => {
    setOpenEdit(!openEdit);
  };

  const handlePdf = (event: any, newValue: string) => {
    setPdfvalue(newValue);
  };
  const handleFileType = () => void {};
  React.useEffect(() => {
    if (sourceView == 'portrait') {
      setWidth(50);
      setHeight(100);
    }
    if (sourceView == 'landscape') {
      setWidth(100);
      setHeight(50);
    }
  }, [sourceView]);

  return (
    <>
      <Box
        pl={2}
        className={clsx({
          [classes.contentbox]: sourceView == 'portrait',
          [classes.contentblock]: sourceView == 'landscape',
        })}
      >
        <Resizable
          style={{background: '#fff', paddingBottom: '12px'}}
          minHeight="20%"
          maxHeight="100%"
          size={{height: height + `%`, width: width + `%`}}
          enable={{
            top: true,
            right: true,
            bottom: true,
            left: false,
            topRight: false,
            bottomRight: false,
            bottomLeft: false,
            topLeft: false,
          }}
          onResizeStop={(e, direction, ref, d) => {
            setHeight(height + d.height);
            setWidth(width + d.width);
          }}
          handleComponent={{
            bottom: (
              <div
                className={clsx({
                  BottomReSizer: sourceView == 'landscape',
                })}
              ></div>
            ),
            right: (
              <div
                className={clsx({
                  RightReSizer: sourceView == 'portrait',
                })}
              ></div>
            ),
          }}
          className={clsx('tableContainer', {
            [classes.horizontal]: sourceView == 'landscape',
            vertical: sourceView == 'portrait',
            [classes.maxWidth]: sourceView == 'portrait',
          })}
        >
          <div
            style={{height: '100%'}}
            className={clsx({
              'overlay-scroll': sourceView == 'landscape' || sourceView == 'portrait',
            })}
          >
            <TableContainer component={Paper} className="tableContainer">
              <Table size="small" aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    {headCells.map((headCell: any) => (
                      <StyledTableCell
                        key={headCell.id}
                        className={clsx({['tableHeadcolumn']: headCell.sortNo == 0})}
                      >
                        <Box display="flex" alignItems="center">
                          <Typography>
                            <StyledCheckbox />
                          </Typography>
                          <Typography
                            style={{fontSize: '12px', display: 'flex', alignItems: 'center'}}
                          >
                            {' '}
                            {headCell.text}
                          </Typography>
                        </Box>
                      </StyledTableCell>
                    ))}
                    <StyledTableCell align="right">Actions</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.cells.map((row: any, index: any) => (
                    <TableData key={index} row={row} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Resizable>

        <Box
          className={clsx('pdfContainer', {
            [classes.horizontal]: sourceView == 'landscape',
            vertical: sourceView == 'portrait',
            hide: sourceView == 'hide',
          })}
        >
          <Grid style={{border: '1px solid #ADCDF0', paddingTop: '10px', background: '#fff'}}>
            <TabContext value={pdfvalue}>
              <TabList
                onChange={handlePdf}
                aria-label="simple tabs"
                className="tabview"
                TabIndicatorProps={{style: {background: 'transparent'}}}
              >
                <Tab className="tabList" label="Q1-2020" value="1" />
                <Box component="div" ml="auto" pr={2}>
                  <Grid component="label" container alignItems="center" spacing={1}>
                    <Grid item>single file</Grid>
                    <Grid item>
                      <Switch
                        onChange={handleFileType}
                        color="primary"
                        name="checkedB"
                        inputProps={{'aria-label': 'primary checkbox'}}
                      />
                    </Grid>
                    <Grid item>multiple files</Grid>
                  </Grid>
                </Box>
              </TabList>
              <TabPanel value="1" style={{padding: '0'}}>
                <Box className="pdfApp">
                  {metaInfo.source == 'pdf' ? (
                    <PdfViewer fileUrl="https://libero-notes.s3.ap-south-1.amazonaws.com/10328_2018FY_AR_SEC_PDF.pdf" />
                  ) : (
                    <PdfViewer fileUrl="https://libero-notes.s3.ap-south-1.amazonaws.com/10328_2018FY_AR_SEC_PDF.pdf" />
                    /* <iframe src={metaInfo.path} width="100%" height="650px"></iframe> */
                  )}
                </Box>
              </TabPanel>
            </TabContext>
          </Grid>
        </Box>
        {/* </Box> */}
      </Box>

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
export default CompanyFinancials;
