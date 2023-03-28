import React, { useState } from 'react';
import { CARDS_DATA } from '../../utils/constants/cards';
import GameCard from '../GameCard/GameCard';
import { Container, Box, Grid, Typography } from '@mui/material';

const GameContainer = () => {
	const [cards, setCards] = useState<CardType[]>(
		CARDS_DATA.sort(() => Math.random() - 0.5)
	);

	return (
		<>
			<Typography variant="h5" align="center" sx={{ my: 1 }}>
				<strong>Game Points: </strong> 0
			</Typography>
			<Box display="flex" justifyContent="center">
				<Grid container columns={5} spacing={2} sx={{ maxWidth: 800 }}>
					{cards.map((item: CardType) => {
						return <GameCard key={item.id} {...item} />;
					})}
				</Grid>
			</Box>
		</>
	);
};

export default GameContainer;
