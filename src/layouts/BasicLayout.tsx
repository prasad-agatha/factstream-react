import React, {FC} from 'react';
// components
import {NavigationBar} from 'src/components/toolbars';

export interface IBasicLayoutProps {
  children: React.ReactNode;
}

const BasicLayout: FC<IBasicLayoutProps> = ({children}) => {
  return (
    <div style={{backgroundColor: '#F4F9FE'}}>
      <NavigationBar />
      <main>{children}</main>
    </div>
  );
};

export default BasicLayout;
