const { expect } = require("chai");

describe("Test contract", function () {
    it("Addition should work", async function () {
        // Create the smart contract object to test from
        const [owner] = await ethers.getSigners();
        const TestContract = await ethers.getContractFactory("Test");
        const contract = await TestContract.deploy();

        // Get output from functions
        const additionTest = await contract.add(6, 6);
        const subtractionTest = await contract.subtract(6, 6);
        const multiplicationTest = await contract.multiply(6, 6);
        expect(additionTest).to.equal(12);
        expect(subtractionTest).to.equal(0);
        expect(multiplicationTest).to.equal(36);
        
    });
});