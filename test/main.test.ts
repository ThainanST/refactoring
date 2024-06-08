import { calculateRide } from "../src/main";

test("Deve calcular corrida normal-diurna", function () {
    const segments = [
        { distance: 10, date: new Date("2021-03-01T10:00:00") }
    ];
    expect(calculateRide(segments)).toBe(21);
});

test("Deve calcular corrida normal-noturna", function () {
    const segments = [
        { distance: 10, date: new Date("2021-03-01T23:00:00") }
    ];
    expect(calculateRide(segments)).toBe(39);
});

test("Deve calcular corrida domingo-diurna", function () {
    const segments = [
        { distance: 10, date: new Date("2021-03-07T10:00:00") }
    ];
    expect(calculateRide(segments)).toBe(29);
});

test("Deve calcular corrida domingo-noturna", function () {
    const segments = [
        {distance: 10, date: new Date("2021-03-07T23:00:00") }
    ];
    expect(calculateRide(segments)).toBe(50);
});

test("Erro de distância errada", function () {
    const segments = [
        {distance: -10, date: new Date("2021-03-01T10:00:00") }
    ];
    expect(() => calculateRide(segments)).toThrow("Invalid distance");
});

test("Erro de data errada", function () {
    const segments = [
        {distance: 10, date: new Date("abcdef") }
    ];
    expect(() => calculateRide(segments)).toThrow("Invalid date");
});

test("Deve calcular corrida curta <10", function () {
    const segments = [
        {distance: 3, date: new Date("2021-03-01T10:00:00") }
    ];
    expect(calculateRide(segments)).toBe(10);
});