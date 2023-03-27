import { StyledHead } from './Head.styles';
import { Typography } from '@mui/material';

const Head = () => {
	return (
		<StyledHead elevation={3}>
			<Typography variant="h4" align="center">
				MEMORY GAME
			</Typography>
		</StyledHead>
	);
};

export default Head;
