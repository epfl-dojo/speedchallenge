beforeEach(() => {
    cy.visit('http://localhost:3000');
});

describe('Task 7 — Header info', () => {
    it('aligns the header info elements correctly (reduced screen size)', () => {
        cy.viewport(900, 980);

        cy.get('#header-info').rect('x').then((parentX) => {
            cy.log('Header info elements: X alignment');

            // First element: aligned to the left
            cy.get('#header-info').contains('12 September 2020').rect('x').then((childX) => {
                expect(parentX).to.be.closeTo(childX, 1, 'expected the first header info element to be aligned to the very left');
            });

            // Last element: aligned to the right
            cy.get('#header-info').contains('CHF 2.90').rect('x').then((childX) => {
                cy.get('#header-info').contains('CHF 2.90').rect('width').then((childWidth) => {
                    expect(childX + childWidth).to.be.closeTo(parentX + 684, 1, 'expected the last header info element to be aligned to the very right');
                });
            });

            // Intermediate elements
            cy.get('#header-info').contains('Bern').rect('x').then((childX) => {
                expect(childX).to.be.closeTo(parentX + 237, 5, 'expected the second header info element to be aligned as specified in the instructions');
            });
            cy.get('#header-info').contains('ict-berufsbildung.ch').rect('x').then((childX) => {
                expect(childX).to.be.closeTo(parentX + 369, 5, 'expected the third header info element to be aligned as specified in the instructions');
            });

            // Vertical alignment
            cy.log('Header info elements: Y alignment');
            cy.get('#header-info').contains('12 September 2020').rect('y').then((firstChildY) => {
                for (const text of ['Bern', 'ict-berufsbildung.ch', 'CHF 2.90']) {
                    cy.get('#header-info').contains(text).rect('y').then((childY) => {
                        expect(childY).to.be.closeTo(firstChildY, 10, `expected ‘${text}’ to be vertically aligned with other header elements`);
                    });
                }
            });
        });
    });

    it('aligns the header info elements correctly (large screen size)', () => {
        cy.viewport(1200, 980);

        cy.get('#header-info').rect('x').then((parentX) => {
            cy.log('Header info elements: X alignment');

            // First element: aligned to the left
            cy.get('#header-info').contains('12 September 2020').rect('x').then((childX) => {
                expect(parentX).to.be.closeTo(childX, 1, 'expected the first header info element to be aligned to the very left');
            });

            // Last element: aligned to the right
            cy.get('#header-info').contains('CHF 2.90').rect('x').then((childX) => {
                cy.get('#header-info').contains('CHF 2.90').rect('width').then((childWidth) => {
                    expect(childX + childWidth).to.be.closeTo(parentX + 880, 1, 'expected the last header info element to be aligned to the very right');
                });
            });

            // Intermediate elements
            cy.get('#header-info').contains('Bern').rect('x').then((childX) => {
                expect(childX).to.be.closeTo(parentX + 302.8, 5, 'expected the second header info element to be aligned as specified in the instructions');
            });
            cy.get('#header-info').contains('ict-berufsbildung.ch').rect('x').then((childX) => {
                expect(childX).to.be.closeTo(parentX + 500.67, 5, 'expected the third header info element to be aligned as specified in the instructions');
            });

            // Vertical alignment
            cy.log('Header info elements: Y alignment');
            cy.get('#header-info').contains('12 September 2020').rect('y').then((firstChildY) => {
                for (const text of ['Bern', 'ict-berufsbildung.ch', 'CHF 2.90']) {
                    cy.get('#header-info').contains(text).rect('y').then((childY) => {
                        expect(childY).to.be.closeTo(firstChildY, 10, `expected ‘${text}’ to be vertically aligned with other header elements`);
                    });
                }
            });
        });
    });

    it('aligns the header info elements correctly with different text', () => {
        cy.viewport(1200, 980);

        cy.get('#header-info').rect('x').then((parentX) => {
            cy.get('#header-info').contains('12 September 2020')
            .then((element) => element.text('12/09/2020'));

            cy.get('#header-info').contains('Bern')
            .then((element) => element.text('Les Chavannes-sous-Romont'));

            cy.get('#header-info').contains('ict-berufsbildung.ch')
            .then((element) => element.text('https://www.ict-berufsbildung.ch/fr/themes/ictskills/'));

            // First element: aligned to the left
            cy.get('#header-info').contains('12/09/2020').rect('x').then((childX) => {
                expect(parentX).to.be.closeTo(childX, 1, 'expected the first header info element to be aligned to the very left');
            });

            // Last element: aligned to the right
            cy.get('#header-info').contains('CHF 2.90').rect('x').then((childX) => {
                cy.get('#header-info').contains('CHF 2.90').rect('width').then((childWidth) => {
                    expect(childX + childWidth).to.be.closeTo(parentX + 880, 1, 'expected the last header info element to be aligned to the very right');
                });
            });

            // Intermediate elements
            cy.get('#header-info').contains('Les Chavannes-sous-Romont')
            .rect('x').then((childX) => {
                expect(childX).to.be.closeTo(parentX + 128, 5, 'expected the second header info element to be aligned as specified in the instructions');
            });

            cy.get('#header-info').contains('https://www.ict-berufsbildung.ch/fr/themes/ictskills/').rect('x').then((childX) => {
                expect(childX).to.be.closeTo(parentX + 386, 5, 'expected the third header info element to be aligned as specified in the instructions');
            });
        });
    });
});

describe('Task 7 — Content structure', () => {
    it('positions the elements correctly (reduced screen size)', () => {
        cy.viewport(900, 980);

        cy.log('Full-width elements');

        // Title
        cy.get('h1').rect('width')
        .then(width => expect(width).to.be.closeTo(684, 1, 'expected the title to have full width'));

        // Header info
        cy.get('#header-info').rect('width')
        .then(width => expect(width).to.be.closeTo(684, 1, 'expected the header info to have full width'));

        // Big article
        cy.get('#article-big').rect('width')
        .then(width => expect(width).to.be.closeTo(434, 1, 'expected the big article to take all the remaining width'));

        // Ad
        cy.get('#advertisement-wrapper').rect('width')
        .then(width => expect(width).to.be.closeTo(250, 1, 'expected the advertisement to be 250 pixels wide'));

        // Small article
        cy.get('#article-small').rect('width')
        .then(width => expect(width).to.be.closeTo(250, 1, 'expected the small article to be 250 pixels wide'));

        // Heights
        cy.get('#article-big').rect('height')
        .then((bigArticleHeight) => {
            expect(bigArticleHeight).to.be.closeTo(1043, 10, 'expected the big article’s height to fit its contents')

            cy.get('#advertisement-wrapper').rect('height')
            .then((adHeight) => {
                cy.get('#article-small').rect('height')
                .then((smallArticleHeight) => {
                    // Same height for both columns
                    expect(bigArticleHeight).to.be.closeTo(smallArticleHeight + adHeight, 1, 'expected the left column to have the same height as the right column');

                    // Size of the small article depending on the content
                    expect(smallArticleHeight).to.be.closeTo(513, 10, 'expected the small article’s height to fit its contents')
                });
            });
        });

        // Y alignment
        cy.get('#article-big').rect('y')
        .then((bigArticleY) => {
            cy.get('#advertisement-wrapper').rect('y')
            .then((adY) => {
                expect(bigArticleY).to.be.closeTo(adY, 1, 'expected the big article and the ad wrapper to be at the same height (on the top)');
            });

            cy.get('#article-small').rect('y')
            .then((smallArticleY) => {
                cy.get('#advertisement-wrapper').rect('height')
                .then((adHeight) => {
                    expect(smallArticleY).to.be.closeTo(bigArticleY + adHeight, 1, 'expected the small article to be below the ad');
                });
            });
        });

        // Footer
        cy.get('footer').rect('width')
        .then(width => expect(width).to.equal(684, 'expected the footer to have full width'));
    });

    it('positions the elements correctly with different text', () => {
        cy.viewport(1200, 980);

        // Shorten the text
        cy.contains('Lorem ipsum dolor sit amet')
        .then((element) => element.text('Lorem ipsum dolor sit amet.'));
        cy.contains('Missa brevis et spiritus maxima.')
        .then((element) => element.text('Missa brevis et spiritus maxima.'));
        cy.contains('Victoriae mundis et mundis lacrima')
        .then((element) => element.text('Victoriae mundis et mundis lacrima.'));
        cy.contains('Odi panem quid meliora')
        .then((element) => element.text('Odi panem quid meliora.'));
        cy.contains('Timeo libri rex agitur')
        .then((element) => element.text('Timeo libri rex agitur.'));

        // Heights
        cy.get('#article-big').rect('height')
        .then((bigArticleHeight) => {
            expect(bigArticleHeight).to.be.closeTo(718.6, 10, 'expected the big article’s height to fit its contents')

            cy.get('#advertisement-wrapper').rect('height')
            .then((adHeight) => {
                cy.get('#article-small').rect('height')
                .then((smallArticleHeight) => {
                    // Same height for both columns
                    expect(bigArticleHeight).to.be.closeTo(smallArticleHeight + adHeight, 1, 'expected the left column to have the same height as the right column');

                    // Size of the small article depending on the content
                    expect(smallArticleHeight).to.be.closeTo(337, 10, 'expected the small article’s height to fit its contents')
                });
            });
        });

        // Y alignment
        cy.get('#article-big').rect('y')
        .then((bigArticleY) => {
            cy.get('#advertisement-wrapper').rect('y')
            .then((adY) => {
                expect(bigArticleY).to.be.closeTo(adY, 1, 'expected the big article and the ad wrapper to be at the same height (on the top)');
            });

            cy.get('#article-small').rect('y')
            .then((smallArticleY) => {
                cy.get('#advertisement-wrapper').rect('height')
                .then((adHeight) => {
                    expect(smallArticleY).to.be.closeTo(bigArticleY + adHeight, 1, 'expected the small article to be below the ad');
                });
            });
        });
    });

    it('positions the elements correctly (large screen size)', () => {
        cy.viewport(1200, 980);

        cy.log('Full-width elements');

        // Title
        cy.get('h1').rect('width')
        .then(width => expect(width).to.be.closeTo(880, 1, 'expected the title to have full width'));

        // Header info
        cy.get('#header-info').rect('width')
        .then(width => expect(width).to.be.closeTo(880, 1, 'expected the header info to have full width'));

        // Big article
        cy.get('#article-big').rect('width')
        .then(width => expect(width).to.be.closeTo(630, 1, 'expected the big article to take all the remaining width'));

        // Ad
        cy.get('#advertisement-wrapper').rect('width')
        .then(width => expect(width).to.be.closeTo(250, 1, 'expected the advertisement to be 250 pixels wide'));

        // Small article
        cy.get('#article-small').rect('width')
        .then(width => expect(width).to.be.closeTo(250, 1, 'expected the small article to be 250 pixels wide'));

        // Heights
        cy.get('#article-big').rect('height')
        .then((bigArticleHeight) => {
            expect(bigArticleHeight).to.be.closeTo(879, 10, 'expected the big article’s height to fit its contents')

            cy.get('#advertisement-wrapper').rect('height')
            .then((adHeight) => {
                cy.get('#article-small').rect('height')
                .then((smallArticleHeight) => {
                    // Same height for both columns
                    expect(bigArticleHeight).to.be.closeTo(smallArticleHeight + adHeight, 1, 'expected the left column to have the same height as the right column');

                    // Size of the small article depending on the content
                    expect(smallArticleHeight).to.be.closeTo(513, 10, 'expected the small article’s height to fit its contents')
                });
            });
        });

        // Y alignment
        cy.get('#article-big').rect('y')
        .then((bigArticleY) => {
            cy.get('#advertisement-wrapper').rect('y')
            .then((adY) => {
                expect(bigArticleY).to.be.closeTo(adY, 1, 'expected the big article and the ad wrapper to be at the same height (on the top)');
            });

            cy.get('#article-small').rect('y')
            .then((smallArticleY) => {
                cy.get('#advertisement-wrapper').rect('height')
                .then((adHeight) => {
                    expect(smallArticleY).to.be.closeTo(bigArticleY + adHeight, 1, 'expected the small article to be below the ad');
                });
            });
        });

        // Footer
        cy.get('footer').rect('width')
        .then(width => expect(width).to.equal(880, 'expected the footer to have full width'));
    });
});
