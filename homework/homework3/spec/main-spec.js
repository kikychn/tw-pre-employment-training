"use strict";
var _ = require("lodash");
var chai = require("chai");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
chai.use(sinonChai);

var main = require("../main/main.js");

describe("Taxi Fare", function () {
    it("Mileage: less than 0 kilometers.", function () {
        var result = main(-1, 0);
        expect(result).to.equal(0);
    });

    it("Mileage: less than or equal to 2 kilometers; Parking time: 0 minutes.", function () {
        var result = main(2, 0);
        expect(result).to.equal(6);
    });

    it("Mileage: less than or equal to 2 kilometers; Parking time: 1 minutes.", function () {
        var result = main(2, 1);
        expect(result).to.equal(6);
    });

    it("Mileage: less than or equal to 1 kilometers; Parking time: 2 minutes.", function () {
        var result = main(2, 3);
        expect(result).to.equal(7);
    });

    it("Mileage: less than or equal to 2 kilometers; Parking time: 3 minutes.", function () {
        var result = main(2, 3);
        expect(result).to.equal(7);
    });

    it("Mileage: less than or equal to 8 kilometers; Parking time: 5 minutes.", function () {
        var result = main(7, 5);
        expect(result).to.equal(11);
    });

    it("Mileage: greater than  8 kilometers; Parking time: 7 minutes.", function () {
        var result = main(10, 7);
        expect(result).to.equal(15);
    });

});