import React from 'react';
import { useStyles } from './GameCard.styles';
import ReactCardFlip from 'react-card-flip';
import { Card, CardMedia, Grid } from '@mui/material';

const GameCard: React.FC<GameCardProps> = ({
	img,
	isActive,
	isMatched,
	markActive,
	cardIndex,
}) => {
	const { classes } = useStyles();

	return (
		<Grid item xs={1}>
			<ReactCardFlip flipDirection="horizontal" isFlipped={!isActive}>
				<Card
					className={`${classes.root} ${isMatched ? classes.matched : ''}`}
					data-testid="front-card"
					raised
				>
					<CardMedia
						component="img"
						image={img}
						alt={img}
						height="75%"
						sx={{ objectFit: 'contain', pointerEvent: 'none' }}
					/>
				</Card>
				<Card
					className={classes.root}
					data-testid="back-card"
					onClick={() => markActive(cardIndex)}
					raised
				>
					<CardMedia
						component="img"
						image="/images/bulb.png"
						alt="bulb"
						height="75%"
						sx={{ objectFit: 'contain', pointerEvent: 'none' }}
					/>
				</Card>
			</ReactCardFlip>
		</Grid>
	);
};

export default GameCard;

interface GameCardProps extends Omit<CardType, 'variant'> {
	isMatched: boolean;
	markActive: markActiveType;
	cardIndex: number;
}
