import { withStyles } from 'tss-react/mui';
import { Container } from '@mui/material';

export const StyledHead = withStyles(Container, (theme) => ({
	root: {
		padding: theme.spacing(1),
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
	},
}));
