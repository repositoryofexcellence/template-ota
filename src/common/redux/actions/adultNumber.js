import {INC_ADULT_NUM, DEC_ADULT_NUM, HOME_INC_ADULT_NUM} from "../constants";

export function incAdultNum() {
    return {
        type: INC_ADULT_NUM,
    };
}

export function decAdultNum() {
    return {
        type: DEC_ADULT_NUM,
    };
}