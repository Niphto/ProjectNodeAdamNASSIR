import WorkData from './WorkModel';

class SpacedRepetitionService {
    public static updateRepetitionData(repetitionData: WorkData, userPerformance: number): void {
        if (userPerformance < 3) {
            repetitionData.repetition_number = 0;
            repetitionData.interval = 1;
        } else {
            repetitionData.repetition_number += 1;
            if (repetitionData.repetition_number === 1) {
                repetitionData.interval = 1;
            } else if (repetitionData.repetition_number === 2) {
                repetitionData.interval = 6;
            } else {
                repetitionData.interval *= repetitionData.easiness_factor;
            }
        }
        repetitionData.easiness_factor = this.calculateEasinessFactor(repetitionData.easiness_factor, userPerformance);
        repetitionData.next_review_due = new Date(Date.now() + repetitionData.interval * 24 * 60 * 60 * 1000);
        repetitionData.save();
    }

    private static calculateEasinessFactor(easinessFactor: number, userPerformance: number): number {
        easinessFactor -= 0.8 - 0.28 * userPerformance - 0.02 * userPerformance * userPerformance;
        return Math.max(1.3, easinessFactor);
    }
}

export default SpacedRepetitionService;