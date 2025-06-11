import React, {FC} from 'react';

// layouts
import {BasicLayout, DrawerLayout} from 'src/layouts';
import {useLocation} from 'react-router-dom';

const SiteLayout: FC = ({children}) => {
  const router = useLocation();
  // const router = useRouter();

  // if (
  //   router.pathname.startsWith('/dashboard') ||
  //   router.pathname.startsWith('/create') ||
  //   router.pathname.startsWith('/company')
  // ) {
  //   return <DrawerLayout>{children}</DrawerLayout>;
  // }

  return (
    <>
      {router.pathname === '/' ||
      router.pathname.startsWith('/dashboard') ||
      router.pathname.startsWith('/create') ||
      router.pathname.startsWith('/company') ? (
        <DrawerLayout>{children}</DrawerLayout>
      ) : router.pathname.includes('auth/signin') ? (
        <BasicLayout>{children}</BasicLayout>
      ) : (
        <>{children}</>
      )}
      {/* <BasicLayout>{children}</BasicLayout> */}
    </>
  );
};

export default SiteLayout;
