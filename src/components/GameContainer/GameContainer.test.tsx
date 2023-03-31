import {
	render,
	screen,
	waitFor,
	act,
	fireEvent,
} from '@testing-library/react';
import GameContainer from './GameContainer';

jest.mock('../../utils/utils', () => ({
	getRandomCards: jest.fn().mockReturnValue([
		{
			img: '/images/angular.png',
			isActive: true,
			variant: 'angular',
		},
		{
			img: '/images/angular.png',
			isActive: true,
			variant: 'angular',
		},
		{
			img: '/images/react.png',
			isActive: true,
			variant: 'react',
		},
	]),
}));

jest.mock('../GameCard/GameCard', () =>
	jest.fn().mockImplementation(({ markActive, cardIndex, isActive }) => (
		<div>
			<div onClick={() => markActive(cardIndex)}>Game Card</div>
			<div>{`GameCard is ${isActive ? 'active' : 'not active'}`}</div>
		</div>
	))
);

jest.mock('../AlertDialog/AlertDialog', () =>
	jest.fn().mockImplementation(({ isDialogOpen, title }) => (
		<div>
			<div title={title}>AlertDialog</div>
			<div>{`AlertDialog is ${isDialogOpen ? 'open' : 'closed'}`}</div>
		</div>
	))
);

jest.useFakeTimers('modern');

describe('GameContainer', () => {
	it('should contain all necessary elements', async () => {
		render(<GameContainer />);
		await act(() => jest.runOnlyPendingTimers());

		const AlertDialog = screen.getByText('AlertDialog');

		expect(AlertDialog).toBeInTheDocument();
		expect(AlertDialog).toHaveAttribute('title', 'Card Matched');
		expect(screen.getByText('Game Points:')).toBeInTheDocument();
		expect(screen.getByTestId('game-score')).toHaveTextContent('0');
		expect(screen.getAllByText('Game Card')).toHaveLength(3);
		expect(screen.getByText('AlertDialog is closed')).toBeInTheDocument();
	});

	it('should deactivated cards after timeout and active onclick', async () => {
		render(<GameContainer />);
		expect(screen.getAllByText('GameCard is active')).toHaveLength(3);
		await act(() => jest.runOnlyPendingTimers());
		expect(screen.getAllByText('GameCard is not active')).toHaveLength(3);

		const GameCards = screen.getAllByText('Game Card');
		fireEvent.click(GameCards[0]);
		await waitFor(() =>
			expect(screen.getAllByText('GameCard is active')).toHaveLength(1)
		);
		fireEvent.click(GameCards[1]);
		await waitFor(() =>
			expect(screen.getAllByText('GameCard is active')).toHaveLength(2)
		);
	});

	it('should update score onclick of same variant cards', async () => {
		render(<GameContainer />);
		await act(() => jest.runOnlyPendingTimers());
		const GameCards = screen.getAllByText('Game Card');

		fireEvent.click(GameCards[0]);
		fireEvent.click(GameCards[1]);
		await act(() => jest.runOnlyPendingTimers());

		expect(screen.getByText('AlertDialog is open')).toBeInTheDocument();
		await act(() => jest.runOnlyPendingTimers());
		expect(screen.getByText('AlertDialog is closed')).toBeInTheDocument();

		expect(screen.getByTestId('game-score')).toHaveTextContent('1');
	});

	it('should not update score onclick of different variant cards', async () => {
		render(<GameContainer />);
		await act(() => jest.runOnlyPendingTimers());
		const GameCards = screen.getAllByText('Game Card');

		fireEvent.click(GameCards[0]);
		fireEvent.click(GameCards[2]);
		await act(() => jest.runAllTimers());

		expect(screen.getAllByText('GameCard is not active')).toHaveLength(3);
	});
});
