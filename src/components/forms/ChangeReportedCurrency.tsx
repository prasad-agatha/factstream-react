import React, {FC} from 'react';
// material UI
import {
  Theme,
  withStyles,
  Typography,
  Box,
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

const ChangeReportedCurrency: FC = () => {
  const handleReportCurrency = () => void {};
  return (
    <>
      <div className="mt-2">
        <Box py={2} component="div" onClick={handleReportCurrency}>
          <Typography>
            Reported Currency: <b>INR</b>
          </Typography>
        </Box>
        <Box py={2}>
          <Typography>
            Change Currency to:{' '}
            <FormControl>
              <Select
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                value=""
                displayEmpty
                // onChange={handleCurrency}
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
          <Typography align="right">
            <Button variant="contained" className="primary-btn">
              Submit
            </Button>
          </Typography>
        </Box>
      </div>
    </>
  );
};

export default ChangeReportedCurrency;
