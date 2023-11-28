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

export const getEmptyUserDto = () => {
    const userDto: UserDto = {
        id: 0,
        name: '',
        email: '',
        phoneNumber: '',
        avatar: undefined,
        gender: Gender.M,
        dateOfBirth: undefined,
        trainer: undefined,
        client: undefined,
    };
    return userDto;
}