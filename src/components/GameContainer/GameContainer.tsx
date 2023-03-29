import React, { useState, useEffect } from 'react';
import { CARDS_DATA } from '../../utils/constants/cards';
import GameCard from '../GameCard/GameCard';
import { Box, Grid, Typography } from '@mui/material';

const GameContainer = () => {
	const [cards, setCards] = useState<CardType[]>(
		CARDS_DATA.sort(() => Math.random() - 0.5)
	);
	const [previousClickedCard, setPreviousClickedCard] =
		useState<previousClickedCardType | null>(null);
	const [score, setScore] = useState<number>(0);

	const flashScreen = (timer: number, index1?: number, index2?: number) => {
		setTimeout(() => {
			setCards((prevCards) => {
				if (index1 !== undefined && index2 !== undefined) {
					const tempCards = [...prevCards];
					tempCards[index1] = { ...tempCards[index1], isActive: false };
					tempCards[index2] = { ...tempCards[index2], isActive: false };
					return tempCards;
				} else {
					return prevCards.map((cardData) => ({
						...cardData,
						isActive: false,
					}));
				}
			});
		}, timer);
	};

	useEffect(() => flashScreen(2500), []);

	const matchCards = (clickedCardIndex: number) => {
		if (cards[clickedCardIndex].variant === previousClickedCard?.variant) {
			setScore((prevScore) => prevScore + 1);
		} else {
			flashScreen(500, previousClickedCard?.index, clickedCardIndex);
		}
	};

	const markActive: markActiveType = (clickedCardIndex) => {
		setCards((prevCards) => {
			const tempCards = [...prevCards];
			tempCards[clickedCardIndex] = {
				...tempCards[clickedCardIndex],
				isActive: true,
			};
			return tempCards;
		});

		if (previousClickedCard !== null) {
			matchCards(clickedCardIndex);
			setPreviousClickedCard(null);
		} else {
			setPreviousClickedCard({
				variant: cards[clickedCardIndex].variant,
				index: clickedCardIndex,
			});
		}
	};

	return (
		<>
			<Typography variant="h5" align="center" sx={{ my: 1 }}>
				<strong>Game Points: </strong> {score}
			</Typography>
			<Box display="flex" justifyContent="center">
				<Grid container columns={5} spacing={2} sx={{ maxWidth: 800 }}>
					{cards.map((item: CardType, cardIndex: number) => {
						return (
							<GameCard
								key={cardIndex}
								{...item}
								markActive={markActive}
								cardIndex={cardIndex}
							/>
						);
					})}
				</Grid>
			</Box>
		</>
	);
};

export default GameContainer;

interface previousClickedCardType {
	index: number;
	variant: CardType['variant'];
}
