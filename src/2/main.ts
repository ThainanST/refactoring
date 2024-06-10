const DAYTIME_NORMAL_FARE = 2.10;
const DAYTIME_SUNDAY_FARE = 2.90;
const NIGHT_NORMAL_FARE = 3.90;
const NIGHT_SUNDAY_FARE = 5.00;
const MINIMUM_FARE = 10;
const NIGHT_START = 22;
const NIGHT_END = 6;

export function calculateRide (segments: any) {
    let fare = 0;
    for (const segment of segments) {
        if (!isValidDistance(segment.distance)) throw new Error("Invalid distance");
        if (!isValidDate(segment.date)) throw new Error("Invalid date");
        if (isOvernight(segment.date) && !isSunday(segment.date)) {
            fare += segment.distance * NIGHT_NORMAL_FARE;
            continue;
        }
        if (isOvernight(segment.date) && isSunday(segment.date)) {
            fare += segment.distance * NIGHT_SUNDAY_FARE;
            continue;
        } 
        if (!isOvernight(segment.date) && isSunday(segment.date)) {
            fare += segment.distance * DAYTIME_SUNDAY_FARE;
            continue;
        }
        if (!isOvernight(segment.date) && !isSunday(segment.date)) {
            fare += segment.distance * DAYTIME_NORMAL_FARE;
            continue;
        }
    }
    return (fare < MINIMUM_FARE) ? MINIMUM_FARE : fare; 
}


function isOvernight(date: Date) {
    return date.getHours() >= NIGHT_START || date.getHours() < NIGHT_END;
}

function isSunday(date: Date) {
    return date.getDay() === 0;
}

function isValidDistance(distance: number) {
    return distance != null && distance != undefined && typeof distance === "number" && distance > 0;
}

function isValidDate(date: Date) {
    return date != null && date != undefined && date instanceof Date && date.toString() !== "Invalid Date";
}