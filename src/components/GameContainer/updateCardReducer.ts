export const updateCardReducer: updateCardReducerType = (state, action) => {
	switch (action.type) {
		case 'makeAllDeactive': {
			return state.map((cardData: CardType) => ({
				...cardData,
				isActive: false,
			}));
		}

		case 'makeTwoDeactive': {
			const tempCards = [...state];

			tempCards[action.previousClickedCardIndex] = {
				...tempCards[action.previousClickedCardIndex],
				isActive: false,
			};

			tempCards[action.currentClickedCardIndex] = {
				...tempCards[action.currentClickedCardIndex],
				isActive: false,
			};

			return tempCards;
		}

		case 'makeOneActive': {
			const tempCards = [...state];

			tempCards[action.clickedCardIndex] = {
				...tempCards[action.clickedCardIndex],
				isActive: true,
			};

			return tempCards;
		}

		case 'markCardsMatched': {
			const tempCards = [...state];

			tempCards[action.currentClickedCardIndex] = {
				...tempCards[action.currentClickedCardIndex],
				isMatched: true,
			};
			tempCards[action.previousClickedCardIndex] = {
				...tempCards[action.previousClickedCardIndex],
				isMatched: true,
			};

			return tempCards;
		}
	}
};
