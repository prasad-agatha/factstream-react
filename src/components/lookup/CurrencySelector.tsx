import React, {FC} from 'react';
// Hooks
// import {useRequest} from 'lib/hooks';
// material ui
import {
  Theme,
  FormControl,
  Select,
  withStyles,
  MenuItem,
  InputBase,
  InputLabel,
} from '@material-ui/core';
// import {SECTORS} from 'lib/constants/endpoints';

const StyledSelectInput = withStyles((theme: Theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
      width: '100%',
    },
    borderRadius: 4,
    border: '1px solid #ced4da',
    '&.Mui-error': {
      borderColor: 'red',
    },
  },
  input: {
    width: '100%',
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,

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

const currency = [
  {id: 1000, name: 'NONE'},
  {id: 1001, name: 'SEK'},
  {id: 1002, name: 'EUR'},
  {id: 1003, name: 'USD'},
  {id: 1004, name: 'Units'},
  {id: 1005, name: 'NOK'},
  {id: 1006, name: 'DKK'},
  {id: 1007, name: 'MYR'},
  {id: 1008, name: 'GBP'},
  {id: 1009, name: 'ISK'},
  {id: 1010, name: 'CAD'},
  {id: 1011, name: 'per'},
  {id: 1012, name: 'INR'},
  {id: 1013, name: 'RMB'},
  {id: 1014, name: 'HKD'},
  {id: 1015, name: 'JPY'},
  {id: 1016, name: 'Pence'},
  {id: 1017, name: 'BRL'},
  {id: 1018, name: 'MXN'},
  {id: 1019, name: 'ARS'},
  {id: 1020, name: 'SGD'},
  {id: 1021, name: 'IDR'},
  {id: 1022, name: 'TWD'},
  {id: 1023, name: 'KRW'},
  {id: 1024, name: 'CHF'},
  {id: 1025, name: 'RP'},
  {id: 1026, name: 'PHP'},
  {id: 1027, name: 'THB'},
  {id: 1028, name: 'AUD'},
  {id: 1029, name: 'US Cent'},
  {id: 1030, name: 'HK Cent'},
];

export interface ICurrencySelectorProps {
  handleSector: (event: any) => void;
  value: string;
  error: boolean;
}
const CurrencySelector: FC<ICurrencySelectorProps> = (props) => {
  // props speading
  const {handleSector, error} = props;
  // const {data: sectors}: any = useRequest({
  //   url: SECTORS,
  // });

  // if (!sectors) {
  //   return <>loading</>;
  // }
  return (
    <>
      <FormControl className="inputForm">
        <InputLabel shrink id="demo-customized-select-label">
          Currency
        </InputLabel>
        <Select
          {...props}
          error={error}
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          onChange={handleSector}
          displayEmpty
          input={<StyledSelectInput />}
        >
          <MenuItem value="">Select Currency</MenuItem>
          {currency.map((option: any, index: any) => (
            <MenuItem key={index} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
export default CurrencySelector;
