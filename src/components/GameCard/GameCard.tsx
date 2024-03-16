import { Card, CardMedia, Grid } from '@mui/material';
import React from 'react';
import ReactCardFlip from 'react-card-flip';
import { useStyles } from './GameCard.styles';

const GameCard: React.FC<GameCardProps> = ({
	img,
	isActive,
	isMatched,
	markActive,
	cardIndex,
	variant,
}) => {
	const { classes } = useStyles();

	return (
		<Grid data-testid={`game-card-${variant}`} item xs={1}>
			<ReactCardFlip flipDirection="horizontal" isFlipped={!isActive}>
				<Card
					className={`${classes.root} ${isMatched ? classes.matched : ''}`}
					data-testid="front-card"
					raised
				>
					<CardMedia
						component="img"
						image={process.env.PUBLIC_URL + img}
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
						image={process.env.PUBLIC_URL + "/images/bulb.png"}
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

interface GameCardProps extends CardType {
	isMatched: boolean;
	markActive: markActiveType;
	cardIndex: number;
}
