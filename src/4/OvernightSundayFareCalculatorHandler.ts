import FareCalculatorHandler from "./FareCalculatorHandler";
import Segment from "./Segment";

export default class OvernightSundayFareCalculatorHandler implements FareCalculatorHandler {
    FARE = 5.0;
    next?: FareCalculatorHandler;

    constructor(next?: FareCalculatorHandler) {
        this.next = next;
    }

    calculate(segment: Segment): number {
        if (segment.isOvernight() && segment.isSunday()) {
            return segment.distance * this.FARE;
        }
        if(!this.next) {
            throw new Error('No fare calculator found');
        }
        return this.next.calculate(segment);
    }
}