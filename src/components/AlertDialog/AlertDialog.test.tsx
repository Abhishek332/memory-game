import { render, screen } from '@testing-library/react';
import AlertDialog from './AlertDialog';

describe('AlertDialog', () => {
	it('should contain card matched and score+1 text for mockProps1', () => {
		render(<AlertDialog {...mockProps1} />);

		expect(screen.getByText('Card Matched')).toBeInTheDocument();
		expect(screen.getByText('Score+1')).toBeInTheDocument();
	});

	it('should contain Game End with 🏁 icon for mockProps2', () => {
		render(<AlertDialog {...mockProps2} />);

		expect(screen.getByText('🏁 Game End 🏁')).toBeInTheDocument();
		expect(
			screen.getByText('Click here to begin the new Game')
		).toBeInTheDocument();

		// const GameRestartBtn = screen.getByTestId('game-restart-button');
		// //overriding window's render method
		// delete window.location;
		// window.location = { reload: mockRestartGame };
		// fireEvent.click(GameRestartBtn);
		// expect(mockRestartGame).toHaveBeenCalled();
	});
});

const mockRestartGame = jest.fn();

const mockProps1 = {
	title: 'Card Matched',
	text: 'Score+1',
	isDialogOpen: true,
	isGameEnd: false,
};

const mockProps2 = {
	title: 'Game End',
	isDialogOpen: true,
	isGameEnd: true,
};
