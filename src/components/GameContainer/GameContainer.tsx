import React, { useState, useEffect } from 'react';
import { CARDS_DATA } from '../../utils/constants/cards';
import GameCard from '../GameCard/GameCard';
import { Box, Grid, Typography } from '@mui/material';
import AlertDialog from '../AlertDialog/AlertDialog';

const GameContainer = () => {
	const [cards, setCards] = useState<CardType[]>(
		CARDS_DATA.sort(() => Math.random() - 0.5)
	);
	const [previousClickedCard, setPreviousClickedCard] =
		useState<previousClickedCardType | null>(null);
	const [score, setScore] = useState<number>(0);
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

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
			setIsDialogOpen(true);
			if (score < 9) {
				setTimeout(() => {
					setIsDialogOpen(false);
				}, 800);
			}
			setScore((prevScore) => prevScore + 1);
		} else {
			flashScreen(100, previousClickedCard?.index, clickedCardIndex);
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
			setTimeout(() => {
				matchCards(clickedCardIndex);
				setPreviousClickedCard(null);
			}, 360);
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
				<strong>Game Points: </strong>
				<span data-testid="game-score">{score}</span>
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
			{score < 10 ? (
				<AlertDialog
					title="Card Matched"
					text="Score+1"
					isDialogOpen={isDialogOpen}
				/>
			) : (
				<AlertDialog title="Game End" isDialogOpen={isDialogOpen} isGameEnd />
			)}
		</>
	);
};

export default GameContainer;

interface previousClickedCardType {
	index: number;
	variant: CardType['variant'];
}
