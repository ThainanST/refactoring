import Ride from "../../src/3/Ride";
import Segment from "../../src/3/Segment";

test("Deve calcular corrida normal-diurna", function () {
    const ride = new Ride();
    ride.addSegment(10, new Date("2021-03-01T10:00:00"));
    expect(ride.calculateRide()).toBe(21);
});

test("Deve calcular corrida normal-noturna", function () {
    const ride = new Ride();
    ride.addSegment(10, new Date("2021-03-01T23:00:00"));
    expect(ride.calculateRide()).toBe(39);
});

test("Deve calcular corrida domingo-diurna", function () {
    const ride = new Ride();
    ride.addSegment(10, new Date("2021-03-07T10:00:00"));
    expect(ride.calculateRide()).toBe(29);
});

test("Deve calcular corrida domingo-noturna", function () {
    const ride = new Ride();
    ride.addSegment(10, new Date("2021-03-07T23:00:00"));
    expect(ride.calculateRide()).toBe(50);
});

test("Erro de distância errada", function () {
    const ride = new Ride();
    expect(() => 
        ride.addSegment(-10, new Date("2021-03-01T10:00:00"))
    ).toThrow("Invalid distance");
});

test("Erro de data errada", function () {
    const ride = new Ride();
    expect(() => 
        ride.addSegment(10, new Date("abcdef"))
    ).toThrow("Invalid date");
});

// test("Deve calcular corrida curta <10", function () {
//     const segments = [
//         {distance: 3, date: new Date("2021-03-01T10:00:00") }
//     ];
//     expect(calculateRide(segments)).toBe(10);
// });