import React from 'react';
import { Card, CardMedia, Grid } from '@mui/material';

const GameCard: React.FC<CardType> = ({ id, img }) => {
	return (
		<Grid item xs={1}>
			<Card
				raised
				sx={{
					maxWidth: '100%',
					aspectRatio: '1',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					padding: 1,
					cursor: 'pointer',
				}}
			>
				<CardMedia
					component="img"
					image={img}
					alt={img}
					height="75%"
					sx={{ objectFit: 'contain' }}
				/>
			</Card>
		</Grid>
	);
};

export default GameCard;
