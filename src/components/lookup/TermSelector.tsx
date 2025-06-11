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
// import {TERMS} from 'lib/constants/endpoints';

const Term_list = [
  {id: 1, name: 'Halfyearly'},
  {id: 2, name: 'Yearly'},
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

export interface ITermSelectorProps {
  handleTerm: (event: any) => void;
  value: string;
  error: boolean;
}

const TermSelector: FC<ITermSelectorProps> = (props) => {
  // props speading
  const {handleTerm, error} = props;
  // const {data: Term_list}: any = useRequest({
  //   url: TERMS,
  // });
  // if (!Term_list) {
  //   return <>loading</>;
  // }
  return (
    <>
      <FormControl className="inputForm">
        <InputLabel shrink id="demo-customized-select-label">
          Term
        </InputLabel>
        <Select
          {...props}
          error={error}
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          onChange={handleTerm}
          displayEmpty
          input={<StyledSelectInput />}
        >
          <MenuItem value="">Select Term</MenuItem>
          {Term_list.map((option: any, index: any) => (
            <MenuItem key={index} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
export default TermSelector;
