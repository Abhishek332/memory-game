import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import GameContainer from './GameContainer';

jest.mock('../GameCard/GameCard', () =>
	jest
		.fn()
		.mockImplementation(({ markActive, cardIndex }) => (
			<div onClick={() => markActive(cardIndex)}>Game Card</div>
		))
);

jest.mock('../AlertDialog/AlertDialog', () =>
	jest.fn().mockImplementation(({ isDialogOpen }) => <div>AlertDialog</div>)
);

describe('GameContainer', () => {
	it('should contain all necessary elements', () => {
		render(<GameContainer />);

		expect(screen.getByText('Game Points:')).toBeInTheDocument();
		expect(screen.getByTestId('game-score')).toBeInTheDocument();
		expect(screen.getAllByText('Game Card')).toHaveLength(20);
		expect(screen.getByText('AlertDialog')).toBeInTheDocument();
	});
});
