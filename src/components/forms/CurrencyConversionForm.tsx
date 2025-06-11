import React, {FC} from 'react';
// material UI
import {
  Theme,
  withStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputBase,
  Button,
} from '@material-ui/core';

const StyledSelectInput = withStyles((theme: Theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
      width: '100%',
    },
  },
  input: {
    width: '100%',
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

function createData(period: string, fix_rate: number) {
  return {period, fix_rate};
}

const rows = [
  createData('FY 18-19', 159),
  createData('FY 18-19', 237),
  createData('FY 18-19', 262),
  createData('FY 18-19', 305),
  createData('FY 18-19', 356),
];

const CurrencyConversionForm: FC = () => {
  const handleReportCurrency = () => void {};
  return (
    <>
      <Grid container>
        <Grid sm={6} component="div" onClick={handleReportCurrency}>
          <Box p={2}>
            <TableContainer component={Paper}>
              <Table size="small" aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Period</TableCell>
                    <TableCell align="right">Fix Rate</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.period}>
                      <TableCell component="th" scope="row">
                        {row.period}
                      </TableCell>
                      <TableCell align="right">{row.fix_rate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
        <Grid sm={6}>
          <Box display="flex" py={2}>
            <Box pr={3}>
              <Typography>
                From:{' '}
                <FormControl>
                  <Select
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    value=""
                    displayEmpty
                    input={<StyledSelectInput />}
                  >
                    <MenuItem value="">INR</MenuItem>
                    <MenuItem value="rupees">Rupees</MenuItem>
                    <MenuItem value="dollar">Dollar</MenuItem>
                    <MenuItem value="euro">Euro</MenuItem>
                  </Select>
                </FormControl>
              </Typography>
            </Box>
            <Box>
              <Typography>
                To:{' '}
                <FormControl>
                  <Select
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    value=""
                    displayEmpty
                    input={<StyledSelectInput />}
                  >
                    <MenuItem value="">GBP</MenuItem>
                    <MenuItem value="rupees">Rupees</MenuItem>
                    <MenuItem value="dollar">Dollar</MenuItem>
                    <MenuItem value="euro">Euro</MenuItem>
                  </Select>
                </FormControl>
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Box>
        <Typography align="right">
          <Button variant="contained" className="primary-btn">
            Covert
          </Button>
        </Typography>
      </Box>
    </>
  );
};

export default CurrencyConversionForm;
