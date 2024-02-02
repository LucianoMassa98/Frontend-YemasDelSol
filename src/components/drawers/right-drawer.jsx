import MuiDrawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';

export const RightDrawer = styled(MuiDrawer)(() => ({
	'& .MuiDrawer-paper': {
		padding: '1.45rem',
		minWidth: '300px',
		maxWidth: '50vw',
	},
}));
