import React from 'react';
import { StyledCard } from './GameCard.styles';
import ReactCardFlip from 'react-card-flip';
import { CardMedia, Grid } from '@mui/material';

const GameCard: React.FC<GameCardProps> = ({
	img,
	isActive,
	markActive,
	cardIndex,
}) => {
	return (
		<Grid item xs={1}>
			<ReactCardFlip flipDirection="horizontal" isFlipped={!isActive}>
				<StyledCard raised>
					<CardMedia
						component="img"
						image={img}
						alt={img}
						height="75%"
						sx={{ objectFit: 'contain', pointerEvent: 'none' }}
					/>
				</StyledCard>
				<StyledCard data-testid="back-card" onClick={() => markActive(cardIndex)} raised>
					<CardMedia
						component="img"
						image="/images/bulb.png"
						alt="bulb"
						height="75%"
						sx={{ objectFit: 'contain', pointerEvent: 'none' }}
					/>
				</StyledCard>
			</ReactCardFlip>
		</Grid>
	);
};

export default GameCard;

interface GameCardProps extends CardType {
	markActive: markActiveType;
	cardIndex: number;
}
