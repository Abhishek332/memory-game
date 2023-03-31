const getRandomCards = (cards: CardType[]): CardType[] => {
	return cards.sort(() => Math.random() - 0.5);
};

export { getRandomCards };
