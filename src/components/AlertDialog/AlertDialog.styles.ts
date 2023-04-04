import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
	title: {
		color: theme.palette.primary.main,
		fontWeight: '600',
		textAlign: 'center',
	},
}));
