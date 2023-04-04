interface CardType {
	img: string;
	isActive: boolean;
	variant: string;
	isMatched: boolean;
}

type markActiveType = (clickedCardIndex: number) => void;

type updateCardActionType =
	| { type: 'makeAllDeactive' }
	| { type: 'makeOneActive'; clickedCardIndex: number }
	| {
			type: 'makeTwoDeactive';
			previousClickedCardIndex: number;
			currentClickedCardIndex: number;
	  }
	| {
			type: 'markCardsMatched';
			previousClickedCardIndex: number;
			currentClickedCardIndex: number;
	  };

type updateCardReducerType = (
	state: CardType[],
	action: updateCardActionType
) => CardType[];
