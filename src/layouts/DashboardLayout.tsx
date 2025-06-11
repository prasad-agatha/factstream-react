import React, {FC} from 'react';
// components
import {DashboardHeader} from 'src/components/toolbars';
import {Paper} from '@material-ui/core';

const DashboardLayout: FC = ({children}) => {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
        <DashboardHeader open={open} handleDrawerOpen={handleDrawerOpen} />
      </div>
      <Paper square className="dashboard-sidebar">
        sidebar
      </Paper>
      <main className="dashboard-main">{children}</main>
      <Paper square className="dashboard-footer">
        Footer
      </Paper>
    </div>
  );
};

export default DashboardLayout;
