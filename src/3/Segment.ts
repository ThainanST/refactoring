export default class Segment { 

    NIGHT_START = 22;
    NIGHT_END = 6;

    constructor (readonly distance: number, readonly date: Date) {
        if (!this.isValidDistance(distance)) throw new Error("Invalid distance");
        if (!this.isValidDate(date)) throw new Error("Invalid date");
    }

    isValidDistance(distance: number): boolean {
        return distance != null && distance != undefined && typeof distance === "number" && distance > 0;
    }
    
    isValidDate(date: Date): boolean {
        return date != null && date != undefined && date instanceof Date && date.toString() !== "Invalid Date";
    }

    isOvernight(date: Date): boolean {
        return date.getHours() >= this.NIGHT_START || date.getHours() < this.NIGHT_END;
    }
    
    isSunday(date: Date): boolean {
        return date.getDay() === 0;
    }
}