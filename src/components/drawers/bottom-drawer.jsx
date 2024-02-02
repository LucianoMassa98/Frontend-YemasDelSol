import MuiDrawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';

export const BottomDrawer = styled(MuiDrawer)(({ theme }) => ({
	'& .MuiDrawer-paper': {
		padding: '1.45rem',
		background: theme.palette.primary.main,
		color: 'white',
	},
}));
