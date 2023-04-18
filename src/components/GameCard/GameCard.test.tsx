import { render, screen, fireEvent } from '@testing-library/react';
import GameCard from './GameCard';

describe('GameCard', () => {
	it('should contain front and back card image', () => {
		render(<GameCard {...mockProps1} />);

		expect(screen.getByAltText('card-image')).toBeInTheDocument();
		expect(screen.getByAltText('bulb')).toBeInTheDocument();
	});

	it('should call markActive function onclick of back card', () => {
		render(<GameCard {...mockProps1} />);

		fireEvent.click(screen.getByTestId('back-card'));
		expect(mockMarkActive).toHaveBeenCalledWith(mockProps1.cardIndex);
	});

	it('should add class conditionaly', () => {
		render(<GameCard {...mockProps2} />);

		expect(
			screen.getByTestId('front-card').classList.value.includes('matched')
		).toEqual(true);
	});
});

const mockMarkActive = jest.fn();

const mockProps1 = {
	img: 'card-image',
	isActive: false,
	markActive: mockMarkActive,
	cardIndex: 3,
	isMatched: false,
};

const mockProps2 = {
	...mockProps1,
	isMatched: true,
};
