import {FitnessLevel} from "./FitnessLevel";

export interface ClientDto{
    id: number;
    bio: string;
    goals: string;
    fitnessLevel: FitnessLevel;
}