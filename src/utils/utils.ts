const getRandomCards = (cards: CardType[]): CardType[] => {
	return [...cards, ...cards].sort(() => Math.random() - 0.5);
};

export { getRandomCards };
