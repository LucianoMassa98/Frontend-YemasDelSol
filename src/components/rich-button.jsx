import MuiButton from '@mui/material/Button';

/**
 * @typedef CustomProps
 * @property {Omit<import("react-router-dom").LinkProps, 'to'>} reactRouterProps
 */

/**
 * @param {import("@mui/material/Button").ButtonProps & CustomProps} props
 */
export const RichButton = (props) => {
	return <MuiButton {...props}>RichLink</MuiButton>;
};
