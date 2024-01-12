import {Opinion} from "./Opinion";

export interface TrainerDetailsType {
    id: number;
    description: string;
    experience: number;
    specializations: string;
    email: string;
    phoneNumber: string;
    userName: string;
    photoNo: number;
    rating: number;
    opinions: Opinion[];
    profileActive: boolean;
}