describe('service is available', function() {
	it('should be available on localhost:3000', function() {
		cy.visit('http://localhost:3000');
	});
});

describe('checking cart: add and delete ingredients', function () {
	before(function() {
		cy.visit('http://localhost:3000');
	});

	it('check bun dragging', function () {
		cy.get('section[class^="ingredients_list_ingredient"]').first().trigger("dragstart");

		cy.get('section[class^="burger-constructor_list"]').first()
		  .trigger("drop")
		  .trigger("dragend");

		cy.get('div[class^="constructor-element constructor-element_pos_top"]')
		  .find('span[class^="constructor-element__text"]')
		  .contains('Краторная булка N-200i (верх)');
		cy.get('div[class^="constructor-element constructor-element_pos_bottom"]')
		  .find('span[class^="constructor-element__text"]')
		  .contains('Краторная булка N-200i (низ)');
		cy.get('p[class^="burger-constructor_total_text"]').contains('2510');
	});

	it('check filling dragging', function () {
		cy.get('section[class^="ingredients_list_section_title"]').as('sections');
		cy.get('@sections').last().find('section[class^="ingredients_list_ingredient"]').as('ingredients');
		cy.get('@ingredients').last().trigger("dragstart");

		cy.get('section[class^="burger-constructor_list"]').first()
		  .trigger("drop")
		  .trigger("dragend");

		cy.get('section[class^="burger-constructor_scrollable"]').find('span[class^="constructor-element__text"]').contains('Соус с шипами Антарианского плоскоходца');
		cy.get('p[class^="burger-constructor_total_text"]').contains('2598');
	});

	it('check delete filling', function () {
		cy.get('section[class^="burger-constructor_scrollable"]').find('span[class^="constructor-element__action"]').click();

		cy.get('section[class^="burger-constructor_scrollable"]').find('span[class^="constructor-element__text"]').should('not.exist')
		cy.get('p[class^="burger-constructor_total_text"]').contains('2510');
	});
});