import { FormProvider, useForm } from 'react-hook-form';

/**
 * @param {object} props
 * @param {(data: object) => void} props.onSubmit
 * @param {object} props.defaultValues
 * @param {import('react').ReactNode} props.children
 */
export const Form = ({ onSubmit, defaultValues, children }) => {
	const methods = useForm({ defaultValues });

	return (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
		</FormProvider>
	);
};
