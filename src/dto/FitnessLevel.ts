export enum FitnessLevel {
    BEGINNER = "BEGINNER",
    NOVICE = "NOVICE",
    INTERMEDIATE = "INTERMEDIATE",
    ADVANCED = "ADVANCED",
    ELITE = "ELITE",
}

export const parseFromString = (input: string): FitnessLevel => {
    switch (input) {
        case FitnessLevel.BEGINNER:
            return FitnessLevel.BEGINNER;
        case FitnessLevel.NOVICE:
            return FitnessLevel.NOVICE;
        case FitnessLevel.INTERMEDIATE:
            return FitnessLevel.INTERMEDIATE;
        case FitnessLevel.ADVANCED:
            return FitnessLevel.ADVANCED;
        case FitnessLevel.ELITE:
            return FitnessLevel.ELITE;
        default:
            console.log('FitnessLevel enum parse error')
            return FitnessLevel.BEGINNER;
    }
}