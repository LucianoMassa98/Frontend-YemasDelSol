import MuiDrawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';

export const RightDrawer = styled(MuiDrawer)(({ theme }) => ({
	'& .MuiDrawer-paper': {
		padding: '1.45rem',
		width: '300px', /* Ancho por defecto */
		[theme.breakpoints.down('sm')]: {
			width: '200px', /* pantallas pequeñas */
			height:'200px'
		},
		[theme.breakpoints.down('xs')]: {
			width: '50px', /* para movil */
		    height:'50px'
		},
	},
}));

