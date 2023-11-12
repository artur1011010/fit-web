import {Gender} from "./Gender";
import {ClientDto} from "./ClientDto";
import {TrainerDto} from "./TrainerDto";

export interface UserDto {
    id?: number;
    name?: string;
    email?: string;
    phoneNumber?: string;
    avatar?: Buffer;
    gender?: Gender;
    dateOfBirth?: Date;
    trainer?: TrainerDto;
    client?: ClientDto;
}