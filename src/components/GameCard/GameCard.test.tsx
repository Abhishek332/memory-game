import { render, screen, fireEvent } from '@testing-library/react';
import GameCard from './GameCard';

describe('GameCard', () => {
	it('should contain front and back card image', () => {
		render(<GameCard {...mockProps} />);

		expect(screen.getByAltText('card-image')).toBeInTheDocument();
		expect(screen.getByAltText('bulb')).toBeInTheDocument();
	});

	it('should call markActive function onclick of back card', () => {
		render(<GameCard {...mockProps} />);

		fireEvent.click(screen.getByTestId('back-card'));
		expect(mockMarkActive).toHaveBeenCalledWith(mockProps.cardIndex);
	});
});

const mockMarkActive = jest.fn();

const mockProps = {
	img: 'card-image',
	isActive: false,
	markActive: mockMarkActive,
	cardIndex: 3,
};
