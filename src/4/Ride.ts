import Segment from './Segment';
import NormalFareCalculator from './NormalFareCalculator';
import OvernightFareCalculator from './OvernightFareCalculator';
import OvernightSundayFareCalculator from './OvernightSundayFareCalculator';
import SundayFareCalculator from './SundayFareCalculator';

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
            if (segment.isOvernight() && !segment.isSunday()) {
                const fareCalculator = new OvernightFareCalculator();
                fare += fareCalculator.calculate(segment);
            }
            if (segment.isOvernight() && segment.isSunday()) {
                const fareCalculator = new OvernightSundayFareCalculator();
                fare += fareCalculator.calculate(segment);
                continue;
            } 
            if (!segment.isOvernight() && segment.isSunday()) {
                const fareCalculator = new SundayFareCalculator();
                fare += fareCalculator.calculate(segment);
                continue;
            }
            if (!segment.isOvernight() && !segment.isSunday()) {
                const fareCalculator = new NormalFareCalculator();
                fare += fareCalculator.calculate(segment);
                continue;
            }
        }
        return (fare < this.MINIMUM_FARE) ? this.MINIMUM_FARE : fare; 
    }

}