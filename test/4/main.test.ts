import NormalFareCalculatorHandler from "../../src/4/NormalFareCalculatorHandler";
import OvernightFareCalculatorHandler from "../../src/4/OvernightFareCalculatorHandler";
import OvernightSundayFareCalculatorHandler from "../../src/4/OvernightSundayFareCalculatorHandler";
import SundayFareCalculatorHandler from "../../src/4/SundayFareCalculatorHandler";
import Ride from "../../src/4/Ride";

let ride: Ride;

beforeEach(() => {
    const overnightSundayFareCalculator = new OvernightSundayFareCalculatorHandler();
    const sundayFareCalculator = new SundayFareCalculatorHandler(overnightSundayFareCalculator);
    const overnightFareCalculator = new OvernightFareCalculatorHandler(sundayFareCalculator);
    const normalFareCalculator = new NormalFareCalculatorHandler(overnightFareCalculator);
    ride = new Ride(normalFareCalculator);
});

test("Deve calcular corrida normal-diurna", function () {
    ride.addSegment(10, new Date("2021-03-01T10:00:00"));
    expect(ride.calculateRide()).toBe(21);
});

test("Deve calcular corrida normal-noturna", function () {
    ride.addSegment(10, new Date("2021-03-01T23:00:00"));
    expect(ride.calculateRide()).toBe(39);
});

test("Deve calcular corrida domingo-diurna", function () {
    ride.addSegment(10, new Date("2021-03-07T10:00:00"));
    expect(ride.calculateRide()).toBe(29);
});

test("Deve calcular corrida domingo-noturna", function () {
    ride.addSegment(10, new Date("2021-03-07T23:00:00"));
    expect(ride.calculateRide()).toBe(50);
});

test("Erro de distância errada", function () {
    expect(() => 
        ride.addSegment(-10, new Date("2021-03-01T10:00:00"))
    ).toThrow("Invalid distance");
});

test("Erro de data errada", function () {
    expect(() => 
        ride.addSegment(10, new Date("abcdef"))
    ).toThrow("Invalid date");
});

test("Deve calcular corrida curta <10", function () {
    ride.addSegment(3, new Date("2021-03-01T10:00:00"));
    expect(ride.calculateRide()).toBe(10);
});