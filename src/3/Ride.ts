import Segment from './Segment';

export default class Ride {

    segments: Segment[];
    DAYTIME_NORMAL_FARE = 2.10;
    DAYTIME_SUNDAY_FARE = 2.90;
    NIGHT_NORMAL_FARE = 3.90;
    NIGHT_SUNDAY_FARE = 5.00;
    MINIMUM_FARE = 10;


    constructor() {
        this.segments = []; 
    }

    addSegment(distance: number, date: Date) {
        this.segments.push(new Segment(distance, date));
    }

    calculateRide(): number {
        let fare = 0;
        for (const segment of this.segments) {
            if (segment.isOvernight(segment.date) && !segment.isSunday(segment.date)) {
                fare += segment.distance * this.NIGHT_NORMAL_FARE;
                continue;
            }
            if (segment.isOvernight(segment.date) && segment.isSunday(segment.date)) {
                fare += segment.distance * this.NIGHT_SUNDAY_FARE;
                continue;
            } 
            if (!segment.isOvernight(segment.date) && segment.isSunday(segment.date)) {
                fare += segment.distance * this.DAYTIME_SUNDAY_FARE;
                continue;
            }
            if (!segment.isOvernight(segment.date) && !segment.isSunday(segment.date)) {
                fare += segment.distance * this.DAYTIME_NORMAL_FARE;
                continue;
            }
        }
        return (fare < this.MINIMUM_FARE) ? this.MINIMUM_FARE : fare; 
    }

}