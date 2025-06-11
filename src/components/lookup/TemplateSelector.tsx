import React, {FC} from 'react';
// material ui
import {
  Box,
  Theme,
  Grid,
  Typography,
  Button,
  withStyles,
  MenuItem,
  InputBase,
  InputLabel,
  FormControl,
  Select,
  Divider,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
} from '@material-ui/core';
import {AddCircle} from '@material-ui/icons';

const templatesType = [
  {
    value: 'Custom template',
    label: 'Custom template',
  },
  {
    value: 'Enterprise template',
    label: 'Enterprise template',
  },
];

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

export interface ITemplateSelectorProps {
  handleTemplateClose: () => void;
}

const TemplateSelector: FC<ITemplateSelectorProps> = (props) => {
  const {handleTemplateClose} = props;
  const [templateType, setTemplateType] = React.useState('');
  const [template, setTemplate] = React.useState('');
  const handleSelector = (event: any) => {
    setTemplateType(event.target.value as string);
  };
  const handleTemplate = (event: any) => {
    setTemplate(event.target.value as string);
  };
  return (
    <>
      <Grid className="mb-2">
        <FormControl className="inputForm">
          <InputLabel shrink id="demo-customized-select-label">
            Choose Main Template
          </InputLabel>
          <Select
            {...props}
            labelId="demo-customized-select-label"
            id="demo-customized-select"
            value={templateType}
            onChange={handleSelector}
            displayEmpty
            input={<StyledSelectInput />}
          >
            <MenuItem value="">Select Template</MenuItem>
            {templatesType.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      {templateType !== '' ? (
        <Grid className="mt-3">
          <FormControl>
            <FormLabel component="legend">Choose {templateType}</FormLabel>
            <RadioGroup
              aria-label="custom template"
              name="custom_template"
              value={template}
              onChange={handleTemplate}
            >
              <FormControlLabel
                value="Bank A Template"
                control={<Radio color="primary" />}
                label="Bank A Template"
              />
              <FormControlLabel
                value="Bank B Template"
                control={<Radio color="primary" />}
                label="Bank B Template"
              />
              <FormControlLabel
                value="Bank C Template"
                control={<Radio color="primary" />}
                label="Bank C Template"
              />
            </RadioGroup>
          </FormControl>
          <Box>
            <Typography>
              <Button size="small" color="primary">
                <AddCircle fontSize="small" />
                &nbsp;Create new Template
              </Button>
            </Typography>
          </Box>
        </Grid>
      ) : (
        ''
      )}
      <Grid className="pt-5">
        <Divider />
        <Typography align="right" className="pt-3">
          <Button size="small" variant="contained" onClick={handleTemplateClose}>
            Start Mapping
          </Button>
        </Typography>
      </Grid>
    </>
  );
};
export default TemplateSelector;
