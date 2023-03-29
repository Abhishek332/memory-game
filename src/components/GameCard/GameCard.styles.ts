import { withStyles } from 'tss-react/mui';
import { Card } from '@mui/material';

export const StyledCard = withStyles(Card, (theme: Theme, props: any) => ({
	root: {
		maxWidth: '100%',
		aspectRatio: '1',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 1,
		cursor: 'pointer',
	},
}));
