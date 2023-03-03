const chai = require("chai");
const diagonalSums = require("../src/diagonalSums");
const expect = chai.expect;

describe("Task 2 — Diagonal Sums", () => {
    it("sums the diagonals of a 2-dimensional (squared) array", () => {
        // standard array
        expect(
            diagonalSums([
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9],
            ])
        ).to.equal(30);

        // no center piece
        expect(
            diagonalSums([
                [10, 15],
                [20, 25],
            ])
        ).to.equal(70);

        // 1 by 1
        expect(diagonalSums([[7]])).to.equal(14);

        // big array
        expect(
            diagonalSums([
                [6, 5, 4, 3, 2, 1],
                [7, 8, 9, 9, 8, 7],
                [6, 5, 4, 3, 2, 1],
                [9, 8, 7, 6, 5, 4],
                [3, 2, 1, 1, 2, 3],
                [4, 5, 6, 7, 8, 9],
            ])
        ).to.equal(60);
    });
});
