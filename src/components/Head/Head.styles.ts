import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles({ name: 'Head' })((theme) => ({
	head: {
		padding: theme.spacing(1),
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
	},
}));
