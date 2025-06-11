import React, {FC} from 'react';
import {Theme, withStyles} from '@material-ui/core/styles';
import {MenuItem, InputBase, Select, FormControl, InputLabel} from '@material-ui/core';

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

interface ISelectProps {
  options: any[];
  handleSelect: (event: any) => void;
  value: string;
  label: string;
  error: boolean;
}

const CustomSelectBox: FC<ISelectProps> = (props: ISelectProps) => {
  // props speading
  const {options, handleSelect, label, error} = props;

  return (
    <>
      <FormControl className="inputForm">
        <InputLabel shrink id="demo-customized-select-label">
          {label}
        </InputLabel>
        <Select
          {...props}
          error={error}
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          displayEmpty
          input={<StyledSelectInput />}
          onChange={handleSelect}
        >
          <MenuItem value="">{label}</MenuItem>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
export default CustomSelectBox;
