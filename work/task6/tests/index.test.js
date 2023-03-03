before(() => {
    cy.visit('http://localhost:3000');

    // remove scrollbars during tests as they cause some problems when calculating dimensions
    cy.window().then((win) => {
        const styles = win.document.createElement('style');
        styles.type = 'text/css';
        styles.appendChild(win.document.createTextNode(`
::-webkit-scrollbar {
    display: none;
}

html {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
        `));
        win.document.head.appendChild(styles);
    });
});

describe('Task 6 — Header', () => {
    it('header is as specified', () => {
        /**
         * Desktop test
         */
        cy.log('--------------------------');
        cy.log('       Desktop test');
        cy.log('vvvvvvvvvvvvvvvvvvvvvvvvvv');
        cy.viewport(800, 731);
        cy.get('header h1 svg').should('be.visible').scrollIntoView();

        // header should not be centered
        cy.get('header h1 svg').rect('left').then((left) => {
            expect(left).to.be.lessThan(30, 'expected the header not to be centered');
        });

        // -----------------------------------------------------------------------------------------

        /**
         * Mobile test
         */
        cy.log('--------------------------');
        cy.log('       Mobile test');
        cy.log('vvvvvvvvvvvvvvvvvvvvvvvvvv');
        cy.viewport(411, 731);
        cy.get('header h1 svg').should('be.visible').scrollIntoView();

        // check that the header is centered
        cy.get('header h1 svg').rect('left').then((left) => {
            expect(left).to.be.closeTo(130, 20, 'expected the header to be centered');
        });
    });
});

describe('Task 6 — Featured Product', () => {
    it('featured product is as specified', () => {
        /**
         * Desktop test
         */
        cy.log('--------------------------');
        cy.log('       Desktop test');
        cy.log('vvvvvvvvvvvvvvvvvvvvvvvvvv');
        cy.viewport(800, 731);
        cy.get('.featured-product').should('be.visible').scrollIntoView();

        // featured product should have original height
        cy.get('.featured-product').rect('height').then((height) => {
            expect(height).to.be.closeTo(450, 1, 'expected the featured product height to be 450px');
        });

        // featured product box should not have the full width
        cy.get('.featured-product .box').rect('width').then((width) => {
            expect(width).to.be.closeTo(336, 20, 'expected the featured product box not to have full width');
        });

        // -----------------------------------------------------------------------------------------

        /**
         * Mobile test
         */
        cy.log('--------------------------');
        cy.log('       Mobile test');
        cy.log('vvvvvvvvvvvvvvvvvvvvvvvvvv');
        cy.viewport(411, 731);
        cy.get('.featured-product').should('be.visible').scrollIntoView();

        // check that the featured product height is as specified
        cy.get('.featured-product').rect('height').then((height) => {
            expect(height).to.be.closeTo(250, 1, 'expected the featured product height to be 250px');
        });

        // check that the featured product box is visible
        cy.get('.featured-product .box').should('be.visible').scrollIntoView();

        // check that the box is as specified
        cy.get('.featured-product .box').rect('left').then((left) => {
            cy.get('.featured-product .box').rect('right').then((right) => {
                expect(right).to.be.closeTo(411 - left, 4, 'expected the featured product box to have full width');
            });
        });
    });
});

describe('Task 6 — Store', () => {
    it('store is as specified', () => {
        /**
         * Desktop test
         */
        cy.log('--------------------------');
        cy.log('       Desktop test');
        cy.log('vvvvvvvvvvvvvvvvvvvvvvvvvv');
        cy.viewport(800, 731);
        cy.get('.store').should('be.visible').scrollIntoView();

        // check that the store has four items per row
        for (let i = 0; i < 8; i++) {
            cy.get('.store ul li').eq(i).rect('left').then((left) => {
                if (i % 4 === 0) {
                    expect(left).to.be.lessThan(30, 'expected the store to have four items per row');
                } else if (i % 4 === 1) {
                    expect(left).to.be.closeTo(202, 20, 'expected the store to have four items per row');
                } else if (i % 4 === 2) {
                    expect(left).to.be.closeTo(400, 20, 'expected the store to have four items per row');
                } else {
                    expect(left).to.be.greaterThan(570, 'expected the store to have four items per row');
                }
            });
        }

        // -----------------------------------------------------------------------------------------

        /**
         * Mobile test
         */
        cy.log('--------------------------');
        cy.log('       Mobile test');
        cy.log('vvvvvvvvvvvvvvvvvvvvvvvvvv');
        cy.viewport(411, 731);
        cy.get('.store').should('be.visible').scrollIntoView();

        // check that the store is as specified
        for (let i = 0; i < 8; i++) {
            cy.get('.store ul li').eq(i).rect('left').then((left) => {
                if (i % 2 === 0) {
                    expect(left).to.be.lessThan(30, 'expected the store to have only two items per row');
                } else {
                    expect(left).to.be.greaterThan(411 / 2 - 2, 'expected the store to have only two items per row');
                }
            });
        }
    });
});

describe('Task 6 — Newsletter', () => {
    it('newsletter signup is as specified', () => {
        /**
         * Desktop test
         */
        cy.log('--------------------------');
        cy.log('       Desktop test');
        cy.log('vvvvvvvvvvvvvvvvvvvvvvvvvv');
        cy.viewport(800, 731);
        cy.get('.newsletter').should('be.visible').scrollIntoView();

        // newsletter fields should be in the same row
        cy.get('.newsletter .form-field.name input').rect('top').then((nameTop) => {
            cy.get('.newsletter .form-field.email input').rect('top').then((emailTop) => {
                cy.get('.newsletter .form-field.submit input').rect('top').then((submitTop) => {
                    expect(emailTop).to.be.closeTo(nameTop, 1, 'expected the email field to be in the same row as the name field');
                    expect(submitTop).to.be.closeTo(emailTop, 1, 'expected the submit button to be in the same row as the email field');
                });
            });
        });
        cy.get('.newsletter .form-field.name').rect('left').then((nameLeft) => {
            cy.get('.newsletter .form-field.email').rect('left').then((emailLeft) => {
                cy.get('.newsletter .form-field.submit').rect('left').then((submitLeft) => {
                    expect(nameLeft).to.be.lessThan(30, 'expected the name field to be left aligned');
                    expect(emailLeft).to.be.closeTo(320, 20, 'expected the email field to be in the same row as the name field');
                    expect(submitLeft).to.be.closeTo(636, 20, 'expected the submit button to be in the same row as the email field');
                });
            });
        });

        // -----------------------------------------------------------------------------------------

        /**
         * Mobile test
         */
        cy.log('--------------------------');
        cy.log('       Mobile test');
        cy.log('vvvvvvvvvvvvvvvvvvvvvvvvvv');
        cy.viewport(411, 731);
        cy.get('.newsletter').should('be.visible').scrollIntoView();

        // check that the inputs have the same x coordinates
        cy.get('.newsletter .form-field.name').rect('left').then((nameLeft) => {
            cy.get('.newsletter .form-field.email').rect('left').then((emailLeft) => {
                cy.get('.newsletter .form-field.submit').rect('left').then((submitLeft) => {
                    expect(nameLeft).to.be.lessThan(30, 'expected the name field to be left aligned');
                    expect(nameLeft).to.be.closeTo(emailLeft, 1, 'expected the email field to be located exactly below the name field');
                    expect(emailLeft).to.be.closeTo(submitLeft, 1, 'expected the submit button to be located exactly below the email field');
                });
            });
        });

        // check that the inputs have the same widths
        cy.get('.newsletter .form-field.name input').rect('width').then((nameWidth) => {
            cy.get('.newsletter .form-field.email input').rect('width').then((emailWidth) => {
                cy.get('.newsletter .form-field.submit input').rect('width').then((submitWidth) => {
                    expect(nameWidth).to.be.closeTo(411 - 20 - 20, 20, 'expected the name field to have the full width');
                    expect(nameWidth).to.be.closeTo(emailWidth, 1, 'expected the email field to have the same width as the name field');
                    expect(emailWidth).to.be.closeTo(submitWidth, 1, 'expected the submit button to have the same width as the email field');
                });
            });
        });

        // check that the inputs are below each other
        cy.get('.newsletter .form-field.name input').rect('top').then((nameTop) => {
            cy.get('.newsletter .form-field.email input').rect('top').then((emailTop) => {
                cy.get('.newsletter .form-field.submit input').rect('top').then((submitTop) => {
                    expect(emailTop).to.be.greaterThan(nameTop + 40, 1, 'expected the email field to be below the name field');
                    expect(submitTop).to.be.greaterThan(emailTop + 40, 1, 'expected the submit button to be below the email field');
                });
            });
        });
    });
});
