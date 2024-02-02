import { TimePicker as MuiTimePicker } from '@mui/x-date-pickers/TimePicker';
import { useController } from 'react-hook-form';

/**
 * @param {import("@mui/x-date-pickers/TimePicker").TimePickerProps & import("react-hook-form").UseControllerProps} props
 */
export const TimePicker = (props) => {
	const { name, control, defaultValue, rules, shouldUnregister, ...textFieldProps } = props;

	const {
		field,
		fieldState: { error },
	} = useController({
		name,
		control,
		defaultValue,
		rules: { required: 'Este campo es requerido', ...rules },
		shouldUnregister,
	});

	return (
		<MuiTimePicker
			{...field}
			{...textFieldProps}
			slotProps={{
				...textFieldProps.slotProps,
				textField: {
					helperText: error?.message,
					error: Boolean(error),
					...textFieldProps.slotProps?.textField,
				},
			}}
		/>
	);
};
