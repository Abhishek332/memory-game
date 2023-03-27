import { withStyles } from 'tss-react/mui';
import { Paper } from '@mui/material';

export const StyledHead = withStyles(Paper, (theme: Theme, props: any) => ({
	root: {
		padding: theme.spacing(1),
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
		height: 60,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
}));
