describe('Memory Game End-to-End Test', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('should contain necessary elements', () => {
		cy.findByRole('heading', { name: /memory game/i }).should('exist');
		cy.findByText('Game Points:').should('exist');
		cy.findByTestId('game-score').should('exist');
		cy.findByTestId('AlertDialog').should('not.be.visible');
	});

	it('should contain 20 cards', () => {
		cy.get('[data-testid*="game-card-"]').should('have.length', 20);
	});

	it('should show the match card popup, if cards matched', () => {
		cy.get('[data-testid*=" is not active"]').should('have.length', 20);
		cy.wait(300);
		cy.get('[data-testid*="game-card-html"]').click({
			multiple: true,
		});
		cy.findByTestId('AlertDialog').should('be.visible');
		cy.findByText('Card Matched').should('exist');
		cy.findByTestId('AlertDialog').should('not.be.visible');
	});

	it('should flip the card again, if cards not matched', () => {
		cy.get('[data-testid*=" is not active"]').should('have.length', 20);
		cy.wait(300);
		cy.get('[data-testid*="game-card-angular"]').first().click();
		cy.wait(300);
		cy.get('[data-testid*="game-card-react"]').first().click();
		cy.get('[data-testid*=" is not active"]').should('have.length', 20);
	});

	it('should show the game end popup and restart game should work', () => {
		cy.get('[data-testid*=" is not active"]').should('have.length', 20);
		cy.wait(300);
		cy.get('[data-testid*="game-card-html"]').click({
			multiple: true,
		});
		cy.wait(300);
		cy.get('[data-testid*="game-card-angular"]').click({
			multiple: true,
		});
		cy.wait(300);
		cy.get('[data-testid*="game-card-react"]').click({
			multiple: true,
		});
		cy.wait(300);
		cy.get('[data-testid*="game-card-css"]').click({
			multiple: true,
		});
		cy.wait(300);
		cy.get('[data-testid*="game-card-javascript"]').click({
			multiple: true,
		});
		cy.wait(300);
		cy.get('[data-testid*="game-card-nodejs"]').click({
			multiple: true,
		});
		cy.wait(300);
		cy.get('[data-testid*="game-card-github"]').click({
			multiple: true,
		});
		cy.wait(300);
		cy.get('[data-testid*="game-card-scss"]').click({
			multiple: true,
		});
		cy.wait(300);
		cy.get('[data-testid*="game-card-vue"]').click({
			multiple: true,
		});
		cy.wait(300);
		cy.get('[data-testid*="game-card-mysql"]').click({
			multiple: true,
		});

		cy.findByTestId('game-score').should('have.text', 10);
		cy.findByTestId('AlertDialog').should('be.visible');
		cy.findByText('🏁 Game End 🏁').should('exist');

		cy.findByText('Click here to begin the new Game').click();
		cy.get('[data-testid*=" is active"]').should('have.length', 20);
	});
});
