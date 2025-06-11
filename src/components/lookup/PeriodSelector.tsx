import React, {FC} from 'react';
// Hooks
// import {useRequest} from 'lib/hooks';
import {
  Theme,
  FormControl,
  Select,
  withStyles,
  MenuItem,
  InputBase,
  InputLabel,
} from '@material-ui/core';
// import {PERIODS} from 'lib/constants/endpoints';
const Period_list = [
  {id: 1, name: '2017'},
  {id: 2, name: '2018'},
  {id: 3, name: '2019'},
  {id: 4, name: '2020'},
];
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

export interface IPeriodSelectorProps {
  handlePeriod: (event: any) => void;
  value: string;
  error: boolean;
}

const PeriodSelector: FC<IPeriodSelectorProps> = (props) => {
  // props speading
  const {handlePeriod, error} = props;
  // const {data: Period_list}: any = useRequest({
  //   url: PERIODS,
  // });
  // if (!Period_list) {
  //   return <>loading</>;
  // }
  return (
    <>
      <FormControl className="inputForm">
        <InputLabel shrink id="demo-customized-select-label">
          Period
        </InputLabel>
        <Select
          {...props}
          error={error}
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          onChange={handlePeriod}
          displayEmpty
          input={<StyledSelectInput />}
        >
          <MenuItem value="">Select Period</MenuItem>
          {Period_list.map((option: any, index: any) => (
            <MenuItem key={index} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
export default PeriodSelector;
