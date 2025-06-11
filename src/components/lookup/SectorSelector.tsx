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

// const sectors = [
//   {
//     value: 'infrastructure',
//     label: 'Infrastructure',
//   },
//   {
//     value: 'telecom',
//     label: 'Telecom',
//   },
//   {
//     value: 'steel',
//     label: 'Steel',
//   },
//   {
//     value: 'automobile',
//     label: 'Automobile',
//   },
//   {
//     value: 'banking',
//     label: 'Banking',
//   },
// ];
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

const sectors = [
  {id: 1, name: 'Energy'},
  {id: 2, name: 'Materials'},
  {id: 3, name: 'Industrials'},
  {id: 4, name: 'Consumer Discretionary'},
  {id: 5, name: 'Consumer Staples'},
  {id: 6, name: 'Health Care'},
  {id: 7, name: 'Financials'},
  {id: 8, name: 'Information Technology'},
  {id: 9, name: 'Communication Services'},
  {id: 10, name: 'Utilities'},
  {id: 11, name: 'Real Estate'},
];

export interface ISectorSelectorProps {
  handleSector: (event: any) => void;
  value: string;
  error: boolean;
}
const SectorSelector: FC<ISectorSelectorProps> = (props) => {
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
          Sector
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
          <MenuItem value="">Select Sector</MenuItem>
          {sectors.map((option: any, index: any) => (
            <MenuItem key={index} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
export default SectorSelector;
