import {render} from '@testing-library/react';

const Providers = ({children}: any) => {
  return children;
};

const customRender = (ui: any, options = {}) => render(ui, {wrapper: Providers, ...options});

// re-export everything
export * from '@testing-library/react';

// override render method
export {customRender as render};
