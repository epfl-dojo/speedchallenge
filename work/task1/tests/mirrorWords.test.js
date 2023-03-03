const chai = require('chai');
const mirrorWords = require('../src/mirrorWords');
const expect = chai.expect;

describe('Task 1 — Mirror letters in words', () => {
    it('mirrors words in a sentence', () => {
        expect(mirrorWords('reverse'))
        .to.equal('esrever');

        expect(mirrorWords('Hello World!')).to.equal('olleH !dlroW');

        expect(mirrorWords('Mirror of Erised'))
        .to.equal('rorriM fo desirE');

        expect(mirrorWords('This message is top secret.'))
        .to.equal('sihT egassem si pot .terces');

        expect(mirrorWords('A kayak reviver deified a civic rotor level'))
        .to.equal('A kayak reviver deified a civic rotor level');

        expect(mirrorWords(''))
        .to.equal('');
    });
});
