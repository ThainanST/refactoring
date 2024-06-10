export default class Segment { 

    NIGHT_START = 22;
    NIGHT_END = 6;

    constructor (readonly distance: number, readonly date: Date) {
        if (!this.isValidDistance()) throw new Error("Invalid distance");
        if (!this.isValidDate()) throw new Error("Invalid date");
    }

    isValidDistance(): boolean {
        return this.distance != null && this.distance != undefined && typeof this.distance === "number" && this.distance > 0;
    }
    
    isValidDate(): boolean {
        return this.date != null && this.date != undefined && this.date instanceof Date && this.date.toString() !== "Invalid Date";
    }

    isOvernight(): boolean {
        return this.date.getHours() >= this.NIGHT_START || this.date.getHours() < this.NIGHT_END;
    }
    
    isSunday(): boolean {
        return this.date.getDay() === 0;
    }
}