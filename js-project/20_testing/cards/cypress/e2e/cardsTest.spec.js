describe('Игра "Пары"', () => {
	beforeEach('passes', () => {
		//запуск с помощью serve
		cy.visit('http://localhost:5000')
	})

	it('Поле 4 на 4, все значения невидимые', () => {
		cy.get('.card').should('have.length', 16)
		cy.get('.card > span').should('not.be.visible')
	})

	it('При клике карточка открывается', () => {
			cy.get('.card:first').click().should('have.class', 'openCard')
	})

	it('Если пара, то правильные', () => {
		cy.get('.card:first').as('firstCard')

		let firstValue
		cy.get('@firstCard').then(($firstCard) => {
			firstValue = $firstCard.text()
		})

		cy.get('@firstCard').nextAll().each(($el) => {
			cy.wrap($el).click()
			cy.get('@firstCard').click()
			if ($el.text() == firstValue) {
				cy.get($el).should('have.class', 'winCard')
				cy.get('@firstCard').should('have.class', 'winCard')
				return false
			}
		})
	})

	it('Если не пара, то закрываются', () => {
		cy.get('.card:first').as('firstCard')

		let firstValue
		cy.get('@firstCard').then(($firstCard) => {
			firstValue = $firstCard.text()
		})

		cy.get('@firstCard').nextAll().each(($el) => {
			cy.wrap($el).click()
			cy.get('@firstCard').click()
			if ($el.text() != firstValue) {
				cy.get($el).next().click()
				cy.get($el).should('not.have.class', 'openCard')
				cy.get('@firstCard').should('not.have.class', 'openCard')
				return false
			}
		})
	})
})

