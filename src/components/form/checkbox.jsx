import MuiCheckbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useController } from 'react-hook-form';

/**
 * @typedef {object} CheckboxCustomProps
 * @property {Omit<import("@mui/material/FormControlLabel").FormControlLabelProps, 'control'>} [formControlLabelProps={}]
 */

/**
 * @param {import("@mui/material").CheckboxProps & CheckboxCustomProps & import("react-hook-form").UseControllerProps} props
 */
export const Checkbox = (props) => {
	const {
		name,
		control,
		defaultValue,
		rules,
		shouldUnregister,
		formControlLabelProps,
		...checkboxProps
	} = props;

	const { field } = useController({
		name,
		control,
		defaultValue,
		rules,
		shouldUnregister,
	});

	return (
		<FormControlLabel
			{...formControlLabelProps}
			control={<MuiCheckbox {...checkboxProps} {...field} />}
			sx={{ m: 0, ...formControlLabelProps.sx }}
		/>
	);
};
