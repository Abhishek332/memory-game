describe('Memory Game End-to-End Test', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('should contain necessary elements', () => {
		cy.findByRole('heading', { name: /memory game/i }).should('exist');
		cy.findByText('Game Points:').should('exist');
		cy.findByTestId('game-score').should('exist');
		cy.findByTestId('AlertDialog is close').should('exist');
	});

	it('should contain 20 cards', () => {
		cy.get('[data-testid*="game-card-"]').should('have.length', 20);
	});

	it('should show the match card popup, if cards matched', () => {
		cy.get('[data-testid*=" is not active"]').should('have.length', 20);
		cy.wait(500);
		cy.get('[data-testid*="game-card-html"]').click({
			multiple: true,
		});
		cy.findByTestId('AlertDialog is open').should('exist');
		cy.findByTestId('AlertDialog is close').should('exist');
	});

	it('should flip the card again, if cards not matched', () => {
		cy.get('[data-testid*=" is not active"]').should('have.length', 20);
		cy.wait(500);
		cy.get('[data-testid*="game-card-angular"]').first().click();
		cy.wait(500);
		cy.get('[data-testid*="game-card-react"]').first().click();
		cy.get('[data-testid*=" is not active"]').should('have.length', 20);
	});
});
