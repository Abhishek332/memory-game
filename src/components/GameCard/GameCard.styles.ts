import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles({
	name: 'GameCard',
})(() => ({
	root: {
		maxWidth: '100%',
		aspectRatio: '1',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 1,
		cursor: 'pointer',
	},
	matched: {
		'&::before': {
			content: `''`,
			position: 'absolute',
			top: 0,
			left: 0,
			height: '100%',
			aspectRatio: '1',
			background:
				'url(/images/matched.png) center no-repeat, rgb( 0 0 0 / 59%)',
		},
	},
}));
