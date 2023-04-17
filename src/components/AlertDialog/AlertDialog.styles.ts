import { withStyles } from 'tss-react/mui';
import { DialogTitle } from '@mui/material';

export const StyledDialogTitle = withStyles(DialogTitle, (theme) => ({
	root: {
		color: theme.palette.primary.main,
		fontWeight: '600',
		textAlign: 'center',
	},
}));
