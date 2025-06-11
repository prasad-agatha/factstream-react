import React, {FC} from 'react';
// Hooks
import {useRequest} from 'src/lib/hooks';
import {
  Theme,
  FormControl,
  Select,
  withStyles,
  MenuItem,
  InputBase,
  InputLabel,
} from '@material-ui/core';
import {QUATERLY} from 'src/lib/constants/endpoints';
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

export interface IQuaterlySelectorProps {
  handleQuaterly: (event: any) => void;
  value: string;
  error: boolean;
}

const QuaterlySelector: FC<IQuaterlySelectorProps> = (props) => {
  // props speading
  const {handleQuaterly, error} = props;
  const {data: Quaterly_list}: any = useRequest({
    url: QUATERLY,
  });
  if (!Quaterly_list) {
    return <>loading</>;
  }
  return (
    <>
      <FormControl className="inputForm">
        <InputLabel shrink id="demo-customized-select-label">
          Quaterly
        </InputLabel>
        <Select
          {...props}
          error={error}
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          onChange={handleQuaterly}
          displayEmpty
          input={<StyledSelectInput />}
        >
          <MenuItem value="">Select Quaterly</MenuItem>
          {Quaterly_list.map((option: any, index: any) => (
            <MenuItem key={index} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
export default QuaterlySelector;
