import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Head from './Head';

describe('Head component test', () => {
	test('should contain MEMORY GAME text', () => {
		render(<Head />);
		expect(screen.getByText('MEMORY GAME')).toBeInTheDocument();
	});
});
