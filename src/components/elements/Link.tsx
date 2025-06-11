import React, {FC} from 'react';
// // link

// // clsx
// import clsx from 'clsx';
// // materail ui
// import MuiLink from '@material-ui/core/Link';

// interface INextComposedProps {
//   as: string | any;
//   href: string | any;
//   prefetch: boolean;
//   ref?: any;
//   children?: any;
// }

// const NextComposed: FC<INextComposedProps> = React.forwardRef((props, ref) => {
//   const {as, href, ...other} = props;

//   return (
//     <NextLink href={href} as={as}>
//       <a ref={ref} {...other} />
//     </NextLink>
//   );
// });

// // A styled version of the Next.js Link component:
// // https://nextjs.org/docs/#with-link
const Link = (props: any) => {
  //   const {
  //     href,
  //     activeClassName = 'active',
  //     className: classNameProps,
  //     innerRef,
  //     naked,
  //     ...other
  //   } = props;

  //   const router = useRouter();
  //   const pathname = typeof href === 'string' ? href : href.pathname;
  //   const className = clsx(classNameProps, {
  //     [activeClassName]: router.pathname === pathname && activeClassName,
  //   });

  //   if (naked) {
  //     return <NextComposed className={className} ref={innerRef} href={href} {...other} />;
  //   }

  return (
    <>
      {/* <MuiLink
        component={NextComposed}
        className={className}
        ref={innerRef}
        href={href}
        {...other}
      /> */}
    </>
  );
};

// // Link.propTypes = {
// //   activeClassName: PropTypes.string,
// //   as: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
// //   className: PropTypes.string,
// //   href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
// //   innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
// //   naked: PropTypes.bool,
// //   onClick: PropTypes.func,
// //   prefetch: PropTypes.bool,
// // };

// export default React.forwardRef((props, ref) => <Link {...props} innerRef={ref} />);
export default Link;
