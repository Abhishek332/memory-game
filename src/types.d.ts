interface Theme {
	palette: any;
	spacing: (space) => any;
}

interface CardType {
	img: string;
	isActive: boolean;
	variant: string;
}

type markActiveType = (clickedCardIndex: number) => void;
