import Segment from './Segment';
import FareCalculatorFactory from './FareCalculatorFactory';
import FareCalculatorHandler from './FareCalculatorHandler';

export default class Ride {

    segments: Segment[];
    MINIMUM_FARE = 10;

    constructor(readonly fareCalculatorHandler: FareCalculatorHandler) {
        this.segments = []; 
    }

    addSegment(distance: number, date: Date) {
        this.segments.push(new Segment(distance, date));
    }

    calculateRide(): number {
        let fare = 0;
        for (const segment of this.segments) {
            fare += this.fareCalculatorHandler.calculate(segment);
        }
        return (fare < this.MINIMUM_FARE) ? this.MINIMUM_FARE : fare; 
    }

}