import { useStyles } from './Head.styles';
import { Container, Typography } from '@mui/material';

const Head = () => {
	const { classes } = useStyles();

	return (
		<Container className={classes.head}>
			<Typography variant="h5" align="center">
				MEMORY GAME
			</Typography>
		</Container>
	);
};

export default Head;
