import MuiLink from '@mui/material/Link';

/**
 * @typedef CustomProps
 * @property {Omit<import("react-router-dom").LinkProps, 'to'>} reactRouterProps
 */

/**
 * @param {import("@mui/material/Link").LinkProps & CustomProps} props
 */
export const RichLink = (props) => {
	return <MuiLink {...props}>RichLink</MuiLink>;
};
