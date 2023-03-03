Cypress.Commands.add('rect', { prevSubject: true }, (subject, property) => {
    return subject[0].getBoundingClientRect()[property];
});
