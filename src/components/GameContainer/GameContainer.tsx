import React, {
	useState,
	useEffect,
	useReducer,
	useMemo,
	useCallback,
} from 'react';
import { CARDS_DATA } from '../../utils/constants/cards';
import {
	CARDS_INACTIVE_TIMER,
	CARDS_FLASH_TIMER,
	CARD_MATCH_DELAY,
	ALERT_DIALOG_TIMEOUT,
} from '../../utils/constants/timers';
import { getRandomCards } from '../../utils/utils';
import GameCard from '../GameCard/GameCard';
import { Box, Grid, Typography } from '@mui/material';
import AlertDialog from '../AlertDialog/AlertDialog';
import { updateCardReducer } from './updateCardReducer';

const GameContainer = () => {
	const randomCards: CardType[] = useMemo(() => getRandomCards(CARDS_DATA), []);
	const [cards, dispatch] = useReducer(updateCardReducer, randomCards);

	const [previousClickedCard, setPreviousClickedCard] =
		useState<previousClickedCardType | null>(null);
	const [score, setScore] = useState<number>(0);
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

	const flashScreen = useCallback(
		(
			timer: number,
			previousClickedCardIndex?: number,
			currentClickedCardIndex?: number
		) => {
			setTimeout(() => {
				if (
					previousClickedCardIndex !== undefined &&
					currentClickedCardIndex !== undefined
				) {
					dispatch({
						type: 'makeTwoDeactive',
						previousClickedCardIndex,
						currentClickedCardIndex,
					});
				} else {
					dispatch({ type: 'makeAllDeactive' });
				}
			}, timer);
		},
		[]
	);

	useEffect(() => flashScreen(CARDS_INACTIVE_TIMER), [flashScreen]);

	const matchCards = (clickedCardIndex: number) => {
		if (cards[clickedCardIndex].variant === previousClickedCard?.variant) {
			setIsDialogOpen(true);
			if (score < 9) {
				setTimeout(() => {
					setIsDialogOpen(false);
				}, ALERT_DIALOG_TIMEOUT);
			}
			setScore((prevScore) => prevScore + 1);
		} else {
			flashScreen(
				CARDS_FLASH_TIMER,
				previousClickedCard?.index,
				clickedCardIndex
			);
		}
	};

	const markActive: markActiveType = (clickedCardIndex) => {
		dispatch({ type: 'makeOneActive', clickedCardIndex });

		if (previousClickedCard !== null) {
			setTimeout(() => {
				matchCards(clickedCardIndex);
				setPreviousClickedCard(null);
			}, CARD_MATCH_DELAY);
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
