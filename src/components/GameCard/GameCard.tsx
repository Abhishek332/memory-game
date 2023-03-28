import React from 'react';
import { StyledCard } from './GameCard.styles';
import { CardMedia, Grid } from '@mui/material';

const GameCard: React.FC<CardType> = ({ id, img }) => {
	return (
		<Grid item xs={1}>
			<StyledCard raised>
				<CardMedia
					component="img"
					image={img}
					alt={img}
					height="75%"
					sx={{ objectFit: 'contain', pointerEvent: 'none' }}
				/>
			</StyledCard>
		</Grid>
	);
};

export default GameCard;
