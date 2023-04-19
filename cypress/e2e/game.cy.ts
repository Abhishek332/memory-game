describe('Memory Game End-to-End Test', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('should contain necessary elements', () => {
		cy.findByRole('heading', { name: /memory game/i }).should('be.visible');
		cy.findByText('Game Points:').should('be.visible');
		cy.findByTestId('game-score').should('be.visible');
		cy.findByTestId('AlertDialog').should('not.be.visible');
	});

	it('should contain 20 cards', () => {
		cy.findAllByTestId('front-card').as('frontCards');
		cy.findAllByTestId('back-card').as('backCards');

		cy.get('@frontCards').should('have.length', 20);

		// if 1 will be visible then assertion pass,
		// we need to check all front cards visible
		cy.get('@frontCards').each(($frontCard) => {
			cy.wrap($frontCard).should('be.visible');
		});

		//it will wait until all front cards not get hide
		cy.get('@frontCards').should('not.be.visible');

		cy.get('@backCards').each((backCard) => {
			cy.wrap(backCard).should('be.visible');
		});
	});

	it('should show the match card popup, if cards matched', () => {
		cy.findAllByTestId('front-card').as('frontCards');
		cy.findByTestId('AlertDialog').as('alertDialog');

		cy.get('@frontCards').should('not.be.visible');

		cy.findAllByTestId('game-card-html').click({
			multiple: true,
		});

		cy.get('@alertDialog')
			.should('be.visible')
			.findByText('Card Matched')
			.should('exist');

		cy.get('@alertDialog').should('not.be.visible');
	});

	it('should flip the card again, if cards not matched', () => {
		cy.findAllByTestId('front-card').as('frontCards');
		cy.findAllByTestId('back-card').as('backCards');

		cy.get('@frontCards').should('not.be.visible');

		cy.findAllByTestId('game-card-angular').first().click();
		// cy.get('@frontCards').should('not.be.visible');
		cy.findAllByTestId('game-card-react').first().click();

		cy.get('@backCards').each(($backCard) => {
			cy.wrap($backCard).should('be.visible');
		});
	});

	it('should show the game end popup and restart game should work', () => {
		cy.findAllByTestId('front-card').as('frontCards');
		cy.findByTestId('AlertDialog').as('alertDialog');
		cy.findAllByTestId('back-card').as('backCards');

		cy.get('@frontCards').should('not.be.visible');

		const cards = [
			'html',
			'css',
			'javascript',
			'angular',
			'nodejs',
			'scss',
			'github',
			'react',
			'mysql',
			'vue js',
		];

		cards.forEach((variant, index) => {
			cy.findAllByTestId(`game-card-${variant}`).click({
				multiple: true,
			});

			cy.get('@alertDialog').should('be.visible');

			if (index === cards.length - 1) {
				cy.findByTestId('game-score').should('have.text', 10);
				cy.get('@alertDialog').findByText('🏁 Game End 🏁').should('exist');

				cy.get('@alertDialog')
					.findByText('Click here to begin the new Game')
					.click();

				cy.get('@frontCards').each(($frontCard) => {
					cy.wrap($frontCard).should('be.visible');
				});
				return;
			}

			cy.get('@alertDialog').should('not.be.visible');
		});
	});
});
