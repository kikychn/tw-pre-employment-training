var calculatePrice = function (mileage, parkingTime) {
    let startingFare = 6;
    let pricePerKilometer = 0.8;
    let pricePerMinuteParking = 0.25;
    let additionChargePercentage = 0.5;
    if (mileage < 2) {
        pricePerKilometer = 0;
    }
    if (mileage < 8) {
        additionChargePercentage = 0;
    }
    return startingFare + parkingTime * pricePerMinuteParking + (mileage - 2) * pricePerKilometer + (mileage - 8) * pricePerKilometer * additionChargePercentage;
}

function main(mileage, parkingTime) {
    if (mileage < 0) {
        return 0;
    }
    let totalFare  = calculatePrice(mileage, parkingTime);
    return Math.round(totalFare);
}

module.exports = main;